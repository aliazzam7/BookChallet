<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Sorts+Mill+Goudy&display=swap" rel="stylesheet">
    
    <link href="search.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="search.js"></script>
    <title>Filter</title>
    <?php
session_start();

// Check if required parameters are set in the GET request
if (isset($_GET['location']) && isset($_GET['budget']) && isset($_GET['date_start']) && isset($_GET['date_end'])) {
    // Fetching parameters from GET method and storing them in session variables
    $_SESSION['location'] = htmlspecialchars($_GET['location']);
    $_SESSION['budget'] = htmlspecialchars($_GET['budget']);
    $_SESSION['date_start'] = htmlspecialchars($_GET['date_start']);
    $_SESSION['date_end'] = htmlspecialchars($_GET['date_end']);
    
} 
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = 2; 
}
?>
</head>
<header>
    <div class="header " style="background-color: #DDE1E1;; ">
       
        <div class="logo-custom"><img src="images/la wen.png" alt="Company Logo"></div>
        <div class="navbar-top-center-custom">
            <a href="home.html">Home</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </div>
        <div class="navbar-top-right-custom">
            <a href="user.html">Sign In</a>
            <a href="signup.html">Sign Up</a>
            
        </div>
        <button class="menu-custom" onclick="toggleSidebar()">☰ Menu</button>
        <div class="sidebar-custom" id="sidebar-custom">
            <span class="close-btn-custom" onclick="toggleSidebar()">×</span>
            <a href="home.html">Home</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="user.html">Sign In</a>
            <a href="signup.html">Sign Up</a>
        </div>
    
</div>
</header>
<body style="background-color: #f8f9fa;">
<input type="hidden" id="sessionVariable" value="<?php echo $_SESSION['user_id']; ?>">
    <div id="card-container" class="body1" >
        


    </div>

    
</body>
</html>