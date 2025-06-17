from flask import Flask, request, redirect, send_file, session, jsonify, render_template
import time, random
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'default-secret-key')  # fallback if not set


def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            port=int(os.getenv('DB_PORT', 3306)),
            connection_timeout=10 # Increase timeout in seconds
        )
        return conn
    except Error as e:
        print(f"Error connecting to DB: {e}")
        return None


def get_cursor(conn):
    try:
        conn.ping(reconnect=True, attempts=3, delay=5)  # Reconnect if lost
        return conn.cursor(buffered=True)
    except Error as e:
        print(f"Error getting cursor: {e}")
        return None


@app.route('/signup', methods=['POST'])
def signup():
    conn = get_db_connection()
    if not conn:
        return "Database connection error", 500

    cursor = get_cursor(conn)
    if not cursor:
        conn.close()
        return "Database cursor error", 500

    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    password = request.form['password']
    confirm_password = request.form['confirmPassword']

    if password != confirm_password:
        cursor.close()
        conn.close()
        return "Passwords do not match."

    try:
        cursor.execute(
            "INSERT INTO users (name, email, phone, password) VALUES (%s, %s, %s, %s)",
            (name, email, phone, password)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return redirect('/login.html')
    except mysql.connector.IntegrityError:
        cursor.close()
        conn.close()
        return "Email already exists."
    except Exception as e:
        cursor.close()
        conn.close()
        return f"Database error: {e}"


@app.route('/login', methods=['POST'])
def login():
    conn = get_db_connection()
    if not conn:
        return "Database connection error", 500

    cursor = get_cursor(conn)
    if not cursor:
        conn.close()
        return "Database cursor error", 500

    try:
        email = request.form['email']
        password = request.form['password']

        cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            return redirect('/dashboard')
        else:
            return "Invalid credentials."

    except Exception as e:
        cursor.close()
        conn.close()
        return f"Login Error: {str(e)}"


@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect('/login.html')

    conn = get_db_connection()
    if not conn:
        return "Database connection error", 500

    cursor = get_cursor(conn)
    if not cursor:
        conn.close()
        return "Database cursor error", 500

    try:
        cursor.execute("SELECT name FROM users WHERE id = %s", (session['user_id'],))
        user = cursor.fetchone()
        name = user[0] if user else "User"
    except Exception as e:
        cursor.close()
        conn.close()
        return f"Database error: {e}"

    cursor.close()
    conn.close()

    return send_file('dashboard.html')


@app.route('/api/slots')
def api_slots():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    # Example static available slots count, replace with DB logic if needed
    available_slots = 100
    return jsonify({'slots': available_slots})


@app.route('/api/cancelBooking/<bookingId>', methods=['DELETE'])
def api_cancel_booking(bookingId):
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Database connection error'}), 500

    cursor = get_cursor(conn)
    if not cursor:
        conn.close()
        return jsonify({'success': False, 'message': 'Database cursor error'}), 500

    # TODO: Implement real booking cancellation with DB
    try:
        # Example: check if bookingId exists then delete
        cursor.execute("SELECT booking_id FROM bookings WHERE booking_id=%s AND email=(SELECT email FROM users WHERE id=%s)", (bookingId, session['user_id']))
        booking = cursor.fetchone()
        if booking:
            cursor.execute("DELETE FROM bookings WHERE booking_id=%s", (bookingId,))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'success': True})
        else:
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': 'Booking ID not found'}), 404
    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/bookingConfirmation')
def api_booking_confirmation():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    booking_id = session.get('last_booking_id')
    if not booking_id:
        return jsonify({'success': False, 'message': 'No booking ID found'}), 404

    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Database connection error'}), 500

    cursor = get_cursor(conn)
    if not cursor:
        conn.close()
        return jsonify({'success': False, 'message': 'Database cursor error'}), 500

    cursor.execute("""
        SELECT booking_id, name, email, phone, gender, room_type, preference, booking_date
        FROM bookings
        WHERE booking_id = %s
    """, (booking_id,))

    row = cursor.fetchone()
    cursor.close()
    conn.close()

    if row:
        keys = ['booking_id', 'name', 'email', 'phone', 'gender', 'room_type', 'preference', 'booking_date']
        return jsonify({'success': True, 'details': dict(zip(keys, row))})
    else:
        return jsonify({'success': False, 'message': 'Booking not found'}), 404


@app.route('/api/profile', methods=['GET', 'POST'])
def api_profile():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = get_cursor(conn)
    if not cursor:
        conn.close()
        return jsonify({'error': 'Database cursor error'}), 500

    user_id = session['user_id']

    if request.method == 'GET':
        cursor.execute("SELECT name, email, phone FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'name': user[0], 'email': user[1], 'phone': user[2]})

    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')  # Optional password update

        # Validate required fields
        if not all([name, email, phone]):
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': 'Name, email, and phone are required.'}), 400

        try:
            if password:
                # Update including password
                cursor.execute(
                    "UPDATE users SET name=%s, email=%s, phone=%s, password=%s WHERE id=%s",
                    (name, email, phone, password, user_id)
                )
            else:
                # Update without password
                cursor.execute(
                    "UPDATE users SET name=%s, email=%s, phone=%s WHERE id=%s",
                    (name, email, phone, user_id)
                )
            conn.commit()
            session['user_name'] = name  # Update session name
            cursor.close()
            conn.close()
            return jsonify({'success': True, 'message': 'Profile updated successfully.'})
        except mysql.connector.IntegrityError:
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': 'Email already exists.'}), 400
        except Exception as e:
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/bookings', methods=['POST'])
def api_bookings():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    data = request.get_json()
    booking_id = f"B{random.randint(1000, 9999)}"
    booking_date = time.strftime("%Y-%m-%d %H:%M:%S")

    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Database connection error'}), 500

    cursor = get_cursor(conn)
    if not cursor:
        conn.close()
        return jsonify({'success': False, 'message': 'Database cursor error'}), 500

    try:
        cursor.execute("""
            INSERT INTO bookings (booking_id, name, email, phone, gender, room_type, preference, booking_date)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            booking_id,
            data['name'],
            data['email'],
            data['phone'],
            data['gender'],
            data['roomType'],
            data['preference'],
            booking_date
        ))
        conn.commit()

        # Save last booking to session for receipt page
        session['last_booking_id'] = booking_id

        cursor.close()
        conn.close()
        return jsonify({'success': True, 'bookingId': booking_id})
    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'message': str(e)})


@app.route('/profile.html')
def serve_profile_page():
    return send_file('profile.html')


@app.route('/profile.css')
def serve_profile_css():
    return send_file('profile.css')


@app.route('/profile.js')
def serve_profile_js():
    return send_file('profile.js')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login.html')


@app.route('/signup.html')
def signup_page():
    return send_file('signup.html')


@app.route('/login.html')
def login_page():
    return send_file('login.html')


@app.route('/dashboard.css')
def dashboard_css():
    return send_file('dashboard.css')


@app.route('/dashboard.js')
def dashboard_js():
    return send_file('dashboard.js')


@app.route('/styles.css')
def serve_css():
    return send_file('styles.css')


@app.route('/srmhostel.png')
def serve_image():
    return send_file('srmhostel.png')


@app.route('/booking.html')
def booking_page():
    return send_file('booking.html')


@app.route('/hostel1.jpeg')
def serve_hostel1():
    return send_file('hostel1.jpeg')


@app.route('/hostel2.png')
def serve_hostel2():
    return send_file('hostel2.png')


@app.route('/hostel3.png')
def serve_hostel3():
    return send_file('hostel3.png')


@app.route('/booking.js')
def booking_js():
    return send_file('booking.js')


@app.route('/booking.css')
def booking_css():
    return send_file('booking.css')


@app.route('/bookingform.html')
def booking_form():
    return send_file('bookingform.html')


@app.route('/bookingform.css')
def booking_form_css():
    return send_file('bookingform.css')


@app.route('/bookingform.js')
def booking_form_js():
    return send_file('bookingform.js')


@app.route('/receipt.html')
def receipt_page():
    return send_file('receipt.html')


@app.route('/receipt.css')
def receipt_css():
    return send_file('receipt.css')


@app.route('/receipt.js')
def receipt_js():
    return send_file('receipt.js')


@app.route('/submit_booking', methods=['POST'])
def submit_booking():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    booking_data = request.json
    print("Booking received:", booking_data)

    # TODO: Save booking_data to DB later

    return jsonify({'success': True, 'message': 'Booking received!'})


@app.route('/index1.css')
def index_css():
    return send_file('index1.css')


@app.route('/')
def home():
    return send_file('index1.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use PORT from env or 5000 by default
    app.run(host='0.0.0.0', port=port, debug=True)
