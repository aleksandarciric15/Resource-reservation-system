CREATE DATABASE  IF NOT EXISTS `user_service` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `user_service`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: user_service
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Enabled` bit(1) DEFAULT NULL,
  `FristName` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `LastName` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `UserId` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Username` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Role` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `DepartmentId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UK3fwf1qdgfhtmivqs75d6runwx` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'aleksandar.ciric@student.etf.unibl.org',_binary '','Aleksandar','Ćirić','8a22bb26-7474-44dd-81f5-58eaa4c7d1d8','aleksandar.ciric@student.etf.unibl.org','client_admin',NULL),(4,'marko@mail.com',_binary '','marko','Markic','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','marko','client_employee',1),(5,'ana@mail.com',_binary '','Ana','Anic','8b2345d9-f04c-44aa-95ba-bfd2753ea203','ana','client_employee',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 18:48:31
CREATE DATABASE  IF NOT EXISTS `notification_service` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `notification_service`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: notification_service
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CreatedAt` datetime(6) NOT NULL,
  `IsRead` bit(1) NOT NULL,
  `Message` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ReceiverId` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ResourceId` int NOT NULL,
  `SenderId` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ReservationDateTime` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ResourceName` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ResourceTypeName` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `SenderName` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `SenderUsername` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (6,'2025-01-27 19:09:23.890873',_binary '','I would like to use that laptop for 10min!','8b2345d9-f04c-44aa-95ba-bfd2753ea203',1,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jun 6, 2025 09:00 - 16:00','HP Laptop','laptop','marko Markic','marko'),(7,'2025-01-27 19:29:00.045323',_binary '','Yes, of course you can have it for 10 to 30min!','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',1,'8b2345d9-f04c-44aa-95ba-bfd2753ea203','Jun 6, 2025 09:00 - 16:00','HP Laptop','laptop','Ana Anic','ana'),(8,'2025-01-27 19:49:22.965260',_binary '','Now, that is really nice from you!\nThank you so much!','8b2345d9-f04c-44aa-95ba-bfd2753ea203',1,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jun 6, 2025 09:00 - 16:00','HP Laptop','laptop','marko Markic','marko'),(9,'2025-01-27 19:52:35.067198',_binary '','Thank you so much my dear friendoo!','8b2345d9-f04c-44aa-95ba-bfd2753ea203',1,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jun 6, 2025 09:00 - 16:00','HP Laptop','laptop','marko Markic','marko'),(10,'2025-01-27 23:13:37.121229',_binary '','Would you make changes with me, I igve you laptop and you give me comp?','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(11,'2025-01-27 23:16:06.111478',_binary '','No, I have to use this computer because I have already started project there and would like to finish it!','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(12,'2025-01-27 23:17:13.391327',_binary '','Hi Ana, I would like to use this resource!','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(13,'2025-01-27 23:19:27.576045',_binary '','jlkjhlakfjdfhasd','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'8b2345d9-f04c-44aa-95ba-bfd2753ea203','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','Ana Anic','ana'),(14,'2025-01-27 23:20:14.545803',_binary '','lkjhlkjhlk','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(15,'2025-01-27 23:21:44.609596',_binary '','llllllllllllllllllllllllllhuiuhi','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(16,'2025-01-27 23:41:41.883480',_binary '','Hello, how are you?','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(17,'2025-01-27 23:51:12.194017',_binary '','dddddddddddddddddddddd','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(18,'2025-01-27 23:56:05.700407',_binary '','therhd sdfg dfg','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(19,'2025-01-28 00:12:50.839670',_binary '','gfjhgfjhgfjhgfjhgfjhgf','8b2345d9-f04c-44aa-95ba-bfd2753ea203',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 12:00 - 14:00','Asus 2007','computer','marko Markic','marko'),(20,'2025-01-28 00:18:26.194645',_binary '','ffffffffffffffffasdf','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 14:00 - 15:00','Asus 2007','computer','marko Markic','marko'),(21,'2025-01-28 00:25:57.245894',_binary '','llllllllllllllpokpokp','8b2345d9-f04c-44aa-95ba-bfd2753ea203',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 28, 2025 12:00 - 14:00','Asus 2007','computer','marko Markic','marko'),(22,'2025-01-28 00:26:23.378409',_binary '','JEdi bre govna!','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'8b2345d9-f04c-44aa-95ba-bfd2753ea203','Jan 28, 2025 12:00 - 14:00','Asus 2007','computer','Ana Anic','ana'),(23,'2025-01-28 01:13:37.108567',_binary '','NO, you are not supposed to take my place!!','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',3,'8b2345d9-f04c-44aa-95ba-bfd2753ea203','Jan 29, 2025 08:00 - 13:00','2A','workplace','Ana Anic','ana'),(24,'2025-01-28 01:14:05.702707',_binary '','Oh my God, I am so sorry.\nTry next time! haaha','8b2345d9-f04c-44aa-95ba-bfd2753ea203',3,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 29, 2025 08:00 - 13:00','2A','workplace','marko Markic','marko'),(25,'2025-01-30 23:42:31.019806',_binary '','I would like to use this place for with you if possible?','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'8b2345d9-f04c-44aa-95ba-bfd2753ea203','Jan 31, 2025 14:00 - 15:30','B1','workplace','Ana Anic','ana'),(26,'2025-01-30 23:43:00.999779',_binary '','Well if you have to, I would like to!','8b2345d9-f04c-44aa-95ba-bfd2753ea203',5,'c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Jan 31, 2025 14:00 - 15:30','B1','workplace','marko Markic','marko'),(27,'2025-01-30 23:43:23.266461',_binary '','Thanks, appreaciate it :)','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1',5,'8b2345d9-f04c-44aa-95ba-bfd2753ea203','Jan 31, 2025 14:00 - 15:30','B1','workplace','Ana Anic','ana');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CreatedAt` datetime(6) NOT NULL,
  `IsRead` bit(1) NOT NULL,
  `Message` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ReservationDate` date NOT NULL,
  `ReservationId` int NOT NULL,
  `Title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Type` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `UserId` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'2025-01-27 22:48:20.806000',_binary '','Reservation has been created by administrator','2025-01-28',18,'New reservation','ADMIN_MAKE_DENY_RESERVATION','8b2345d9-f04c-44aa-95ba-bfd2753ea203'),(2,'2025-01-27 22:50:36.961000',_binary '','Reservation has been created by administrator','2025-01-28',19,'New reservation','ADMIN_MAKE_DENY_RESERVATION','8b2345d9-f04c-44aa-95ba-bfd2753ea203'),(3,'2025-01-27 22:57:16.649000',_binary '\0','Reservation has been created by administrator','2025-01-28',20,'New reservation','ADMIN_MAKE_DENY_RESERVATION','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1'),(4,'2025-01-27 22:59:46.304000',_binary '','Reservation has been created by administrator','2025-01-28',21,'New reservation','ADMIN_MAKE_DENY_RESERVATION','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1'),(5,'2025-01-30 23:45:52.070000',_binary '\0','Reservation has been created by administrator','2025-02-04',37,'New reservation','ADMIN_MAKE_DENY_RESERVATION','8b2345d9-f04c-44aa-95ba-bfd2753ea203');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 18:48:31
CREATE DATABASE  IF NOT EXISTS `resource_service` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `resource_service`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: resource_service
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `resource`
--

DROP TABLE IF EXISTS `resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resource` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ResourceTypeId` int NOT NULL,
  `Removed` bit(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK7nkxkur21cgl90vqq72fg510m` (`ResourceTypeId`),
  CONSTRAINT `FK7nkxkur21cgl90vqq72fg510m` FOREIGN KEY (`ResourceTypeId`) REFERENCES `resource_type` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource`
--

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;
INSERT INTO `resource` VALUES (1,'Very fast laptop to!','HP Laptop',3,_binary '\0'),(2,'Near window','A1',1,_binary '\0'),(3,'Near door','A2',1,_binary '\0'),(4,'Computer for projects','Asus',2,_binary '\0'),(5,'Sector in second floor','B1',1,_binary '\0');
/*!40000 ALTER TABLE `resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource_type`
--

DROP TABLE IF EXISTS `resource_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resource_type` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource_type`
--

LOCK TABLES `resource_type` WRITE;
/*!40000 ALTER TABLE `resource_type` DISABLE KEYS */;
INSERT INTO `resource_type` VALUES (2,'computer'),(3,'laptop'),(1,'workplace');
/*!40000 ALTER TABLE `resource_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 18:48:31
CREATE DATABASE  IF NOT EXISTS `reservation_service` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `reservation_service`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: reservation_service
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CreatedAt` datetime(6) NOT NULL,
  `EmployeeId` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Reason` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Date` date NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `Denied` bit(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (19,'2025-01-28 08:15:30.000000','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Important client meeting.','2025-01-29','10:00:00','12:00:00',_binary '\0'),(20,'2025-01-28 09:30:45.000000','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Project presentation.','2025-01-31','14:00:00','15:30:00',_binary '\0'),(21,'2025-01-28 10:00:00.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Weekly team update.','2025-01-31','09:00:00','11:00:00',_binary '\0'),(22,'2025-01-28 10:45:10.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Training session for new hires.','2025-02-01','13:00:00','15:00:00',_binary ''),(23,'2025-01-28 11:15:25.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Customer support review.','2025-02-02','11:30:00','13:30:00',_binary '\0'),(24,'2025-01-28 12:30:00.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Tech seminar preparation.','2025-02-03','14:30:00','16:00:00',_binary '\0'),(25,'2025-01-28 13:00:00.000000','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','HR department check-in.','2025-02-04','09:00:00','10:30:00',_binary '\0'),(26,'2025-01-28 13:45:30.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Annual sales report meeting.','2025-02-05','10:00:00','12:00:00',_binary '\0'),(27,'2025-01-28 14:20:40.000000','8a22bb26-7474-44dd-81f5-58eaa4c7d1d8','Manager brainstorming session.','2025-02-06','14:00:00','16:00:00',_binary '\0'),(28,'2025-01-28 15:00:15.000000','8a22bb26-7474-44dd-81f5-58eaa4c7d1d8','Onboarding new team members.','2025-02-07','11:00:00','13:00:00',_binary '\0'),(29,'2025-01-28 15:45:50.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Quarterly financial update.','2025-02-08','09:00:00','10:30:00',_binary ''),(30,'2025-01-28 16:15:30.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Customer satisfaction survey.','2025-02-09','10:30:00','12:00:00',_binary '\0'),(31,'2025-01-28 16:30:45.000000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','Internal strategy meeting.','2025-02-10','09:30:00','11:00:00',_binary '\0'),(32,'2025-01-28 17:00:00.000000','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','New technology workshop.','2025-02-11','14:00:00','15:30:00',_binary '\0'),(33,'2025-01-28 17:15:00.000000','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Marketing team update.','2025-02-12','11:30:00','13:30:00',_binary '\0'),(34,'2025-01-28 17:45:00.000000','8a22bb26-7474-44dd-81f5-58eaa4c7d1d8','Security protocol training.','2025-02-14','10:00:00','11:30:00',_binary '\0'),(35,'2025-01-28 18:00:00.000000','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Staff appreciation event.','2025-02-14','14:00:00','16:00:00',_binary '\0'),(36,'2025-01-28 18:30:00.000000','c86ea0f9-ed8b-4ba4-93b5-22f775e7c3c1','Department reorganization.','2025-02-15','13:00:00','15:00:00',_binary ''),(37,'2025-01-30 23:45:51.500000','8b2345d9-f04c-44aa-95ba-bfd2753ea203','You have to finish some work on laptop!','2025-02-04','10:00:00','16:00:00',_binary '\0');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_resource`
--

DROP TABLE IF EXISTS `reservation_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_resource` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ResourceId` int NOT NULL,
  `ReservationId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FKpj0619cicegdw39vitkp53bex` (`ReservationId`),
  CONSTRAINT `FKpj0619cicegdw39vitkp53bex` FOREIGN KEY (`ReservationId`) REFERENCES `reservation` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_resource`
--

LOCK TABLES `reservation_resource` WRITE;
/*!40000 ALTER TABLE `reservation_resource` DISABLE KEYS */;
INSERT INTO `reservation_resource` VALUES (28,1,19),(29,2,19),(30,3,20),(31,5,20),(32,1,21),(33,3,21),(34,2,22),(35,5,23),(36,1,24),(37,3,24),(38,4,25),(39,5,25),(40,2,26),(41,4,27),(42,1,28),(43,2,28),(44,3,29),(45,5,29),(46,1,30),(47,4,31),(48,2,32),(49,5,33),(50,3,34),(51,1,35),(52,2,36),(53,1,37);
/*!40000 ALTER TABLE `reservation_resource` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 18:48:31
CREATE DATABASE  IF NOT EXISTS `department_service` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `department_service`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: department_service
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `WorkTimeEnd` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `WorkTimeStart` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UKmh3ij32xt09y70cfhf2la4jji` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'First company to difi!','Lanaco IB','16:00','08:00');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `CompanyId` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UKdpd2utodfmelcelmgl6bnoms4` (`Name`),
  KEY `FK7uaf20t5m2ar321mh0re59umq` (`CompanyId`),
  CONSTRAINT `FK7uaf20t5m2ar321mh0re59umq` FOREIGN KEY (`CompanyId`) REFERENCES `company` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Marketing',1),(2,'Project Management',1),(3,'Data Science',1),(4,'Security',1);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 18:48:32

-- Drop user if it exists
DROP USER 'pisio_project'@'%';

-- Create the user
CREATE USER 'pisio_project'@'%' IDENTIFIED BY 'pisio_project';

-- Grant necessary privileges
GRANT ALL PRIVILEGES ON user_service.* TO 'pisio_project'@'%';
GRANT ALL PRIVILEGES ON notification_service.* TO 'pisio_project'@'%';
GRANT ALL PRIVILEGES ON department_service.* TO 'pisio_project'@'%';
GRANT ALL PRIVILEGES ON reservation_service.* TO 'pisio_project'@'%';
GRANT ALL PRIVILEGES ON resource_service.* TO 'pisio_project'@'%';

-- Apply privileges
FLUSH PRIVILEGES;

