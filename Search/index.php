<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Chalet</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        .form-group button {
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        .form-group button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
<?php 
session_start();


$_SESSION = array();
?>
<div class="container">
    <h1>Search Chalet</h1>
    <form action="filter.php" method="get">
        <div class="form-group">
            <label for="location">Location:</label>
            <input type="text" id="location" name="location">
        </div>
        <div class="form-group">
            <label for="budget">Budget:</label>
            <input type="number" id="budget" name="budget" >
        </div>
        <div class="form-group">
            <label for="date_start">Start Date:</label>
            <input type="date" id="date_start" name="date_start" >
        </div>
        <div class="form-group">
            <label for="date_end">End Date:</label>
            <input type="date" id="date_end" name="date_end" >
        </div>
        
        <div class="form-group">
            <button type="submit">Search</button>
        </div>
    </form>
</div>

</body>
</html>
