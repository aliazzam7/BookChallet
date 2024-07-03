-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2024 at 09:21 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lawein`
--

-- --------------------------------------------------------

--
-- Table structure for table `chalet`
--

CREATE TABLE `chalet` (
  `id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `location` varchar(55) NOT NULL,
  `price` float NOT NULL,
  `date` date DEFAULT NULL,
  `description` text NOT NULL,
  `image` varchar(55) NOT NULL,
  `host_id` int(11) NOT NULL,
  `numOf_bedrooms` int(11) NOT NULL,
  `numOf_guests` int(11) NOT NULL,
  `numOf_baths` int(11) NOT NULL,
  `numOf_beds` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `pic` varchar(100) NOT NULL,
  `large` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chalet`
--

INSERT INTO `chalet` (`id`, `name`, `location`, `price`, `date`, `description`, `image`, `host_id`, `numOf_bedrooms`, `numOf_guests`, `numOf_baths`, `numOf_beds`, `start_time`, `end_time`, `pic`, `large`) VALUES
(1, 'Mountain Haven', ' Faraya', 200.99, '2024-07-03', 'The chalet is located in Rayfoun about 900 meters from Fouad Chehab roundabout where you can find many restaurants, shops and nightlife places. It is at 1147 meters from sea level. Jeita grotto is 15 min away by car and ski lovers are 20 min away from Mzaar ski slopes.\r\n', 'images/image(1).jpeg', 1, 0, 0, 0, 0, '07:17:34', '10:00:00', '', 'image0.jpeg'),
(3, 'Chalet  Ajaltoun', 'Chalet  Ajaltoun', 299, '2024-07-13', 'A cheerful chalet located in Ajaltoun\r\nRelax with the whole family at this peaceful place to stay', 'images/image(2).jpeg', 1, 0, 0, 0, 0, '07:17:34', '11:00:00', '', ''),
(8, 'bekaa chalet', 'New York, US', 200, '2024-07-28', '', 'images/image(3).jpeg', 1, 7, 4, 4, 4, '00:00:00', '00:00:00', '', ''),
(11, 'nabatieh view', 'nabatieh', 200, '2022-07-13', 'juhdhdhd', 'images/image(4).jpeg', 1, 2, 4, 2, 4, '11:55:00', '05:55:00', '', ''),
(12, 'test1234', 'test1234', 123, '2024-07-02', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', ''),
(13, 'test2', 'test2', 100, '2024-07-02', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', ''),
(15, 'seeka', 'test', 200, '2024-07-13', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', ''),
(16, 'Mountain Retreat', 'test', 100, '2024-07-02', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', ''),
(48, 'v', 'v', 100, '2024-07-02', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', ''),
(49, 'ali', 'Alps', 100, '2024-07-02', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', ''),
(54, 'fds', 's', 2000, '2024-07-02', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', ''),
(55, 'Mountain Retreateses', 'Alps', 100, '2024-07-02', '', '', 1, 0, 0, 0, 0, '00:00:00', '00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `user_id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `equipment_name` varchar(55) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `equipment_name`, `img`) VALUES
(7, 'parking', 'home background.jpg'),
(9, 'wifi', '../group/images/icons-06.png'),
(10, 'air conditioning', '../group/images/icons-03.png'),
(11, 'pool', '../group/images/icons-08.png'),
(12, 'TV', '../group/images/icons-01.png'),
(13, 'cheminee', '../group/images/icons-04.png'),
(14, 'jacuzzi', '../group/images/icons-02.png'),
(15, 'outdoor kitchen', '../group/images/icons-05.png'),
(16, 'computer', '../group/images/icons-07.png');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_chalet`
--

CREATE TABLE `equipment_chalet` (
  `id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `chalet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipment_chalet`
--

INSERT INTO `equipment_chalet` (`id`, `equipment_id`, `chalet_id`) VALUES
(1, 10, 1),
(2, 13, 1),
(3, 16, 1),
(4, 14, 1),
(5, 15, 1),
(6, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `host`
--

CREATE TABLE `host` (
  `id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL,
  `phone` int(11) NOT NULL,
  `image` varchar(55) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `host`
--

INSERT INTO `host` (`id`, `name`, `email`, `phone`, `image`, `description`) VALUES
(1, 'feras', 'feras@gmail.com', 998774840, '../group/images/portrait.jpg', 'Superhost 6 years hosting');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chalet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `user_id`, `chalet_id`) VALUES
(2, 1, 13),
(5, 1, 16),
(6, 1, 48),
(7, 1, 49),
(11, 2, 49),
(22, 3, 12),
(25, 1, 1),
(26, 4, 55),
(30, 3, 15),
(31, 2, 54);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `chalet_id` int(11) NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `guests` int(11) NOT NULL,
  `total_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`chalet_id`, `check_in`, `check_out`, `user_id`, `guests`, `total_cost`) VALUES
(1, '2024-07-03', '2024-07-04', 2, 0, 0),
(1, '2024-07-03', '2024-07-04', 2, 2, 200),
(3, '2024-07-05', '2024-07-06', 1, 3, 300),
(16, '2024-07-07', '2024-07-08', 4, 1, 150),
(55, '2024-07-09', '2024-07-10', 3, 4, 400),
(8, '2024-07-11', '2024-07-12', 2, 2, 250),
(11, '2024-07-13', '2024-07-14', 1, 3, 350),
(49, '2024-07-15', '2024-07-16', 4, 1, 180),
(1, '2024-07-17', '2024-07-18', 3, 2, 220),
(3, '2024-07-19', '2024-07-20', 2, 4, 420),
(16, '2024-07-21', '2024-07-22', 1, 3, 380);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fname` varchar(55) NOT NULL,
  `lname` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` varchar(55) NOT NULL,
  `BoD` date DEFAULT NULL,
  `address` varchar(55) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `date_register` date NOT NULL,
  `image` varchar(55) NOT NULL,
  `role` enum('user','admin','superadmin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `email`, `password`, `BoD`, `address`, `phone`, `date_register`, `image`, `role`) VALUES
(1, 'noure', 'hjeij', 'nourhjej2023@icloud.com', 'f331f8fc485c9f864b56f6f0ea8537ce', '1995-06-08', 'breikeh', '78847290', '2024-06-27', 'uploads/person.png', 'admin'),
(2, 'ali', 'admin', 'admin@gmail.com', '0a7a07b6fhfghfghgf', '2014-07-16', 'tyr', '78847290', '2024-06-27', '', 'admin'),
(3, 'doha', 'abdallah', 'dohaa@gmail.com', '6244f4b3bb60a11fe46e87c34dccdb33', '2006-07-05', 'Beqaa', '90862784', '2024-06-27', 'uploads/portrait.jpg', 'user'),
(4, 'super', 'admin', 'superadmin@gmail.com', '6efc98a1d7f991b3', '1997-07-09', 'breikeh', '78847290', '2024-06-27', '', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `whishlist`
--

CREATE TABLE `whishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chalet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `whishlist`
--

INSERT INTO `whishlist` (`id`, `user_id`, `chalet_id`) VALUES
(52, 1, 3),
(55, 3, 16),
(56, 2, 55),
(57, 4, 8),
(58, 1, 49),
(60, 2, 3),
(62, 3, 55),
(65, 3, 13),
(67, 3, 1),
(69, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chalet`
--
ALTER TABLE `chalet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `host_id` (`host_id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipment_chalet`
--
ALTER TABLE `equipment_chalet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chalet id` (`chalet_id`),
  ADD KEY `equipment id` (`equipment_id`);

--
-- Indexes for table `host`
--
ALTER TABLE `host`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `chalet_id` (`chalet_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `chalet_id` (`chalet_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whishlist`
--
ALTER TABLE `whishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `chalet_id` (`chalet_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chalet`
--
ALTER TABLE `chalet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `equipment_chalet`
--
ALTER TABLE `equipment_chalet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `host`
--
ALTER TABLE `host`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `whishlist`
--
ALTER TABLE `whishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chalet`
--
ALTER TABLE `chalet`
  ADD CONSTRAINT `chalet_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `host` (`id`);

--
-- Constraints for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD CONSTRAINT `contact_us_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `equipment_chalet`
--
ALTER TABLE `equipment_chalet`
  ADD CONSTRAINT `equipment_chalet_ibfk_1` FOREIGN KEY (`chalet_id`) REFERENCES `chalet` (`id`),
  ADD CONSTRAINT `equipment_chalet_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`);

--
-- Constraints for table `owners`
--
ALTER TABLE `owners`
  ADD CONSTRAINT `owners_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `owners_ibfk_2` FOREIGN KEY (`chalet_id`) REFERENCES `chalet` (`id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`chalet_id`) REFERENCES `chalet` (`id`),
  ADD CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `whishlist`
--
ALTER TABLE `whishlist`
  ADD CONSTRAINT `whishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `whishlist_ibfk_2` FOREIGN KEY (`chalet_id`) REFERENCES `chalet` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
