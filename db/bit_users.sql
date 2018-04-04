-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: 10.4.20.25    Database: bit_users
-- ------------------------------------------------------
-- Server version	5.5.47

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE `bit_users` /*!40100 DEFAULT CHARACTER SET utf8 */;
use bit_users;

--
-- Table structure for table `birth`
--

DROP TABLE IF EXISTS `birth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `birth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birth_id` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `father_name` varchar(20) DEFAULT NULL,
  `father_id` varchar(20) DEFAULT NULL,
  `mother_name` varchar(20) DEFAULT NULL,
  `mother_id` varchar(20) DEFAULT NULL,
  `hospital_id` varchar(20) DEFAULT NULL,
  `if_managed` tinyint(4) DEFAULT NULL,
  `if_look` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `birth`
--

LOCK TABLES `birth` WRITE;
/*!40000 ALTER TABLE `birth` DISABLE KEYS */;
/*!40000 ALTER TABLE `birth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `create_check`
--

DROP TABLE IF EXISTS `create_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `create_check` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `check_id` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `father_name` varchar(20) DEFAULT NULL,
  `father_id` varchar(20) DEFAULT NULL,
  `mother_name` varchar(20) DEFAULT NULL,
  `mother_id` varchar(20) DEFAULT NULL,
  `marry_cert` varchar(20) DEFAULT NULL,
  `birth_id` varchar(20) DEFAULT NULL,
  `birth_date` varchar(20) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `hospital_id` varchar(20) DEFAULT NULL,
  `checkflag` varchar(20) DEFAULT NULL,
  `if_managed` tinyint(4) DEFAULT NULL,
  `if_ar` tinyint(4) DEFAULT NULL,
  `if_look` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `create_check`
--

LOCK TABLES `create_check` WRITE;
/*!40000 ALTER TABLE `create_check` DISABLE KEYS */;
/*!40000 ALTER TABLE `create_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divorce_check`
--

DROP TABLE IF EXISTS `divorce_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `divorce_check` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `check_id` varchar(20) DEFAULT NULL,
  `husband_name` varchar(20) DEFAULT NULL,
  `husband_id` varchar(20) DEFAULT NULL,
  `wife_name` varchar(20) DEFAULT NULL,
  `wife_id` varchar(20) DEFAULT NULL,
  `marry_cert` varchar(20) DEFAULT NULL,
  `check_manage` varchar(20) DEFAULT NULL,
  `man_photo1` blob,
  `man_hashcode` blob,
  `woman_photo1` blob,
  `mwoman_hashcode` blob,
  `marry_book1` blob,
  `book_hashcode` blob,
  `if_managed` tinyint(4) DEFAULT NULL,
  `if_ar` tinyint(4) DEFAULT NULL,
  `if_look` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divorce_check`
--

LOCK TABLES `divorce_check` WRITE;
/*!40000 ALTER TABLE `divorce_check` DISABLE KEYS */;
/*!40000 ALTER TABLE `divorce_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `human`
--

DROP TABLE IF EXISTS `human`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `human` (
  `key` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `address` varchar(20) DEFAULT NULL,
  `photo` blob,
  `hashcode` blob,
  `if_managed` tinyint(4) DEFAULT NULL,
  `if_look` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `human`
--

LOCK TABLES `human` WRITE;
/*!40000 ALTER TABLE `human` DISABLE KEYS */;
/*!40000 ALTER TABLE `human` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_user`
--

DROP TABLE IF EXISTS `login_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `identy` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=9 ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_user`
--

LOCK TABLES `login_user` WRITE;
/*!40000 ALTER TABLE `login_user` DISABLE KEYS */;
INSERT INTO `login_user` VALUES (1,'110105199409026605','123456','用户'),(2,'hospital','123456','医院'),(3,'police','123456','公安局'),(4,'civil','123456','民政局'),(5,'security','123456','社保局'),(6,'110105199409026615','123456','用户'),(7,'qq','qq','用户');
/*!40000 ALTER TABLE `login_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marry_card`
--

DROP TABLE IF EXISTS `marry_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marry_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marry_cert` varchar(20) DEFAULT NULL,
  `photo` blob,
  `hashcode` blob,
  `if_managed` tinyint(4) DEFAULT NULL,
  `if_ar` tinyint(4) DEFAULT NULL,
  `if_look` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marry_card`
--

LOCK TABLES `marry_card` WRITE;
/*!40000 ALTER TABLE `marry_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `marry_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marry_check`
--

DROP TABLE IF EXISTS `marry_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marry_check` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `check_id` varchar(20) DEFAULT NULL,
  `husband_name` varchar(20) DEFAULT NULL,
  `husband_id` varchar(20) DEFAULT NULL,
  `husband_state` varchar(20) DEFAULT NULL,
  `wife_name` varchar(20) DEFAULT NULL,
  `wife_id` varchar(20) DEFAULT NULL,
  `wife_state` varchar(20) DEFAULT NULL,
  `checkflag` varchar(6) DEFAULT NULL,
  `photo` blob,
  `hashcode` blob,
  `if_managed` tinyint(4) DEFAULT NULL,
  `if_ar` tinyint(4) DEFAULT NULL,
  `if_look` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=7 ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marry_check`
--

LOCK TABLES `marry_check` WRITE;
/*!40000 ALTER TABLE `marry_check` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Table structure for table `create_check`
--

DROP TABLE IF EXISTS `security_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `security_card` (
  `key` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(20) DEFAULT NULL,
  `new_photo` blob,
  `new_hashcode` blob,
  `print_photo` blob,
  `print_hashcode` blob,
  `if_managed` tinyint(4) DEFAULT NULL,
  `if_look` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `create_check`
--

LOCK TABLES `create_check` WRITE;
/*!40000 ALTER TABLE `create_check` DISABLE KEYS */;
/*!40000 ALTER TABLE `create_check` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-21 14:13:57
