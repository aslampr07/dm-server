-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: management
-- ------------------------------------------------------
-- Server version	5.7.27

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

--
-- Table structure for table `Request_Accepted`
--

DROP TABLE IF EXISTS `Request_Accepted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Request_Accepted` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `requestID` int(10) unsigned DEFAULT NULL,
  `volunteerID` int(10) unsigned DEFAULT NULL,
  `acceptedTime` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ra_unique` (`requestID`,`volunteerID`),
  KEY `volunteerID` (`volunteerID`),
  CONSTRAINT `Request_Accepted_ibfk_1` FOREIGN KEY (`requestID`) REFERENCES `Victim_Request` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Request_Accepted_ibfk_2` FOREIGN KEY (`volunteerID`) REFERENCES `Volunteer` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Request_Accepted`
--

LOCK TABLES `Request_Accepted` WRITE;
/*!40000 ALTER TABLE `Request_Accepted` DISABLE KEYS */;
INSERT INTO `Request_Accepted` VALUES (3,23,85,'2019-06-14 09:12:14');
/*!40000 ALTER TABLE `Request_Accepted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Victim_Request`
--

DROP TABLE IF EXISTS `Victim_Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Victim_Request` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` char(13) NOT NULL,
  `location` varchar(50) NOT NULL,
  `latitude` decimal(8,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `requestTime` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Victim_Request`
--

LOCK TABLES `Victim_Request` WRITE;
/*!40000 ALTER TABLE `Victim_Request` DISABLE KEYS */;
INSERT INTO `Victim_Request` VALUES (22,'aslam','+913215246354','kalamassery',10.053946,76.379520,'2019-06-14 09:00:18'),(23,'mirsha','+913252555555','malapuram',10.053946,76.378520,'2019-06-14 09:01:38'),(25,'Abu','+919141427272','Aluva',10.053946,76.379720,'2019-06-14 13:54:29'),(28,'Babu','+912349488548','attapady',10.053946,76.379720,'2019-06-14 14:32:48');
/*!40000 ALTER TABLE `Victim_Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Volunteer`
--

DROP TABLE IF EXISTS `Volunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Volunteer` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` char(13) NOT NULL,
  `latitude` decimal(8,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `creationTime` datetime NOT NULL,
  `online_status` tinyint(4) NOT NULL DEFAULT '1',
  `verified` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Volunteer`
--

LOCK TABLES `Volunteer` WRITE;
/*!40000 ALTER TABLE `Volunteer` DISABLE KEYS */;
INSERT INTO `Volunteer` VALUES (85,'John','+919648564646',10.053946,76.379720,'2019-06-14 09:10:03',1,0),(86,'Aslam','+918089454846',10.053946,76.379720,'2019-06-14 14:12:05',1,0);
/*!40000 ALTER TABLE `Volunteer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `priority` tinyint(4) NOT NULL,
  `code` char(6) DEFAULT NULL,
  `creationTime` datetime NOT NULL,
  `heading` varchar(100) NOT NULL,
  `body` varchar(500) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,1,NULL,'2019-03-07 14:41:52','Shutter Opens at 9:30','The minister has announced that the shutter is going to open today at 19:00PM'),(2,2,NULL,'2019-03-07 14:56:00','Dam exploded','District collector has said that the dam have been severly damaged and exploded.'),(7,1,'b1c1eb','2019-06-14 10:44:38','water level reducing','water level is reducing in areas near Aluva.'),(8,1,'f7295a','2019-06-14 14:00:19','Dont spread fake news: Chief Minister','Chief minister asked people not to spread any fake news.');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'management'
--
/*!50003 DROP FUNCTION IF EXISTS `calculate_distance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`remote`@`%` FUNCTION `calculate_distance`(lat1 decimal(8,6), lng1 decimal(9,6), lat2 decimal(8,6), lng2 decimal(9,6)) RETURNS decimal(7,3)
    DETERMINISTIC
BEGIN
    DECLARE R INT;
    DECLARE dLat DECIMAL(30,15);
    DECLARE dLng DECIMAL(30,15);
    DECLARE a1 DECIMAL(30,15);
    DECLARE a2 DECIMAL(30,15);
    DECLARE a DECIMAL(30,15);
    DECLARE c DECIMAL(30,15);
    DECLARE d DECIMAL(30,15);

    SET R = 6371; 
    SET dLat = RADIANS( lat2 ) - RADIANS( lat1 );
    SET dLng = RADIANS( lng2 ) - RADIANS( lng1 );
    SET a1 = SIN( dLat / 2 ) * SIN( dLat / 2 );
    SET a2 = SIN( dLng / 2 ) * SIN( dLng / 2 ) * COS( RADIANS( lng1 )) * COS( RADIANS( lat2 ) );
    SET a = a1 + a2;
    SET c = 2 * ATAN2( SQRT( a ), SQRT( 1 - a ) );
    SET d = R * c;
RETURN d;
RETURN 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-04  9:41:30
