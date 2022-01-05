-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2022 at 07:34 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `maincategory`
--

CREATE TABLE `maincategory` (
  `id` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `url` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `maincategory`
--

INSERT INTO `maincategory` (`id`, `Name`, `url`) VALUES
(1, 'Maincategory08', '/Maincategory08'),
(2, 'book1', '/book1'),
(3, 'men', '/men'),
(4, 'owmen', '/owmen'),
(5, 'kids', '/kids'),
(14, 'main category1', '/main category1'),
(15, 'main category9', '/main category9'),
(16, 'main category10', '/main category10'),
(17, 'main category11', '/main category11');

-- --------------------------------------------------------

--
-- Table structure for table `nestedsubcategory`
--

CREATE TABLE `nestedsubcategory` (
  `Nsubid` int(11) NOT NULL,
  `Subid` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nestedsubcategory`
--

INSERT INTO `nestedsubcategory` (`Nsubid`, `Subid`, `Name`, `value`) VALUES
(1, 1, 'size', 'M'),
(2, 1, 'size', 'L'),
(3, 1, 'size', 'M'),
(4, 1, 'color', 'red'),
(5, 2, 'size', 'XL'),
(6, 2, 'color', 'blue'),
(7, 3, 'size', 'M'),
(8, 3, 'color', '');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Pid` int(11) NOT NULL,
  `Subid` int(11) NOT NULL,
  `Name` varchar(250) NOT NULL,
  `purl` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Pid`, `Subid`, `Name`, `purl`) VALUES
(1, 1, 'Product1', ''),
(2, 2, 'Product2', ''),
(3, 7, 'TEST Prod Insert1', '/book1/11/TEST Prod Insert1'),
(4, 9, 'TEST Prod Insert2', '/thsinewbookurl/test2/TEST Prod Insert2');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `Subid` int(11) NOT NULL,
  `Mcategoryid` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `suburl` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`Subid`, `Mcategoryid`, `Name`, `suburl`) VALUES
(1, 3, 'Subcategory02', '/Subcategory02'),
(2, 3, 'subcategory2', '/men322/subcategory2'),
(3, 3, 'subcategory3', '/men322/subcategory3'),
(4, 4, 'subcategory4', '/owmen222/subcategory4'),
(5, 4, 'subcategory5', '/owmen222/subcategory5'),
(6, 4, 'subcategory6', '/owmen222/subcategory6'),
(7, 5, 'Subcategory7', '/Subcategory7'),
(8, 5, 'subcategory8', '/kids/subcategory8'),
(9, 2, 'subcategory9', '/thsinewbookurl2/subcategory9');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `maincategory`
--
ALTER TABLE `maincategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nestedsubcategory`
--
ALTER TABLE `nestedsubcategory`
  ADD PRIMARY KEY (`Nsubid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Pid`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`Subid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `maincategory`
--
ALTER TABLE `maincategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `nestedsubcategory`
--
ALTER TABLE `nestedsubcategory`
  MODIFY `Nsubid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `Subid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
