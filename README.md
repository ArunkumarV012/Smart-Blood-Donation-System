
# Smart Blood Donation System ❤️

This is a comprehensive full-stack application designed to streamline the process of blood donation requests and donor management. The system connects hospitals seeking blood with eligible donors, facilitating a quick and efficient response to urgent needs.

-----

### 1\. Features ✨

  * Donor & Hospital Registration/Login: Secure user authentication for two distinct user types.
  * Real-time Donor Matching: Hospitals can search for and view a list of donors who match their specific blood group and location requirements.
  * Request Management: Hospitals can post blood requests and track their status from 'Pending' to 'Completed'.
  * Automated Email Notifications: When a hospital sends a request, an automated email is sent to the donor, providing all the necessary details.
  * Profile Management: Donors can view and update their personal and contact information.

-----

### 2\. Technology Stack 🛠️

  * Frontend: React.js, HTML, CSS, Axios, React Router
  * Backend: Node.js, Express.js
  * Database: SQLite3
  * Email Service: Nodemailer

-----

### 3\. Installation and Setup 🚀

To run this project on your local machine, follow these steps:

#### Prerequisites

  * Node.js (LTS version recommended)
  * A code editor like VS Code

#### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the required Node.js packages:
    ```bash
    npm install
    ```
3.  **Database Configuration:** The SQLite database file (`blood_donation.db`) is automatically created when you run the server for the first time.
4.  **Email Configuration:**
      * Create a file named `emailService.js` in the `backend` directory.
      * Add your Gmail credentials and an app password (for security) as shown in the file's comments.
5.  Start the backend server:
    ```bash
    node server.js
    ```
    The server will run on `http://localhost:5000`.

#### Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the required packages:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
    The application will open in your default browser at `http://localhost:3000`.

-----

### 4\. API Endpoints 📋

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/donors/register` | `POST` | Registers a new donor. |
| `/api/donors/login` | `POST` | Authenticates a donor. |
| `/api/donors/:id` | `PUT` | Updates a donor's profile. |
| `/api/hospitals/register` | `POST` | Registers a new hospital. |
| `/api/hospitals/login` | `POST` | Authenticates a hospital. |
| `/api/hospitals/request-blood` | `POST` | Posts a new blood request and finds matching donors. |
| `/api/hospitals/:hospital_id/blood-requests`| `GET` | Retrieves all requests from a specific hospital. |
| `/api/blood-requests/:request_id/status`| `PUT` | Updates a blood request's status. |
| `/api/donors/send-request` | `POST` | Sends an email notification to a specific donor. |
