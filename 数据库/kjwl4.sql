/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.10-log : Database - kjwl
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`kjwl` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `kjwl`;

/*Table structure for table `kjwl_pc_user` */

DROP TABLE IF EXISTS `kjwl_pc_user`;

CREATE TABLE `kjwl_pc_user` (
  `kjwl_u_id` int(10) NOT NULL AUTO_INCREMENT,
  `kjwl_u_name` varchar(20) DEFAULT NULL,
  `kjwl_u_account` int(10) DEFAULT NULL,
  `kjwl_u_password` varchar(20) DEFAULT NULL,
  `kjwl_u_portrait` varchar(100) DEFAULT NULL,
  `kjwl_u_birthdate` date DEFAULT NULL,
  `kjwl_u_sex` varchar(10) DEFAULT NULL,
  `kjwl_u_identity` int(2) DEFAULT NULL,
  `kjwl_u_phone` varchar(20) DEFAULT NULL,
  `kjwl_u_email` varchar(30) DEFAULT NULL,
  `kjwl_u_status` int(2) DEFAULT NULL,
  `kjel_u_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`kjwl_u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_user` */

insert  into `kjwl_pc_user`(`kjwl_u_id`,`kjwl_u_name`,`kjwl_u_account`,`kjwl_u_password`,`kjwl_u_portrait`,`kjwl_u_birthdate`,`kjwl_u_sex`,`kjwl_u_identity`,`kjwl_u_phone`,`kjwl_u_email`,`kjwl_u_status`,`kjel_u_datetime`) values 
(1,'小红',1234567890,'123456',NULL,'1999-04-14','女',1,'18978951265','456789123@qq.com',1,'2021-07-20 10:03:23'),
(2,'小明',1234567891,'987456',NULL,'1993-08-21','男',1,'15648975264','789456123@qq.com',0,'2021-07-20 10:03:51'),
(3,'小刚',1234567892,'011qaz',NULL,'1999-10-17','男',1,'13945678541','741852963@136.com',1,'2021-07-20 10:03:24'),
(4,'yiyi',1294784589,'123456','http://localhost:8000/upload_7f62153bb28025d7491beed930a278dd.png','1995-11-24','男',2,'15504651107','1234784569@qq.com',1,'2021-07-30 12:44:31'),
(5,'erer',1234567893,'qazwsx','http://localhost:8000/头像.png','1979-12-14','女',2,'12345698720','7898529634@163.com',1,'2021-07-20 10:03:26'),
(6,'sansan',1234567894,'123456','http://localhost:8000/头像.png','2021-07-25','男',1,'12345698554','123@456.com',1,'2021-07-20 10:03:27'),
(7,'思思',1234567895,'123456','http://localhost:8000/头像.png','1999-07-14','女',1,'12345678952','4897@1564qq.com',1,'2021-07-20 10:03:45'),
(8,'liuliu',1234567896,'123456','http://localhost:8000/头像.png','1999-08-12','女',2,'12345678952','123@789.com',1,'2021-07-20 10:03:28'),
(9,'qiqi',1234567897,'123456','http://localhost:8000/头像.png','2021-07-18','女',1,'13245678952','1345@qq.com',0,'2021-07-20 10:33:04'),
(10,'baba',1234567898,'123456','http://localhost:8000/头像.png','2021-07-19','男',2,'15498256215','4564@ww.com',1,'2021-07-20 10:06:27'),
(11,'小五',1234567899,'123456','http://localhost:8000/头像.png','2021-07-29','女',1,'16547845134','4654@dd.com',1,'2021-07-30 14:54:10'),
(12,'ruoruo',1234567900,'123456','http://localhost:8000/头像.png','2021-07-26','女',2,'18946513215','7895@dd.com',1,'2021-07-30 15:03:23'),
(13,'滴滴',1234567901,'123456','http://localhost:8000/头像.png','2021-07-04','男',1,'15646523898','512@ss.com',1,'2021-07-30 15:03:56'),
(14,'覅覅',1234657902,'123456','http://localhost:8000/头像.png','2021-07-14','男',1,'14986236545','4513@ff.com',1,'2021-07-30 15:04:37'),
(15,'虎虎',1234567903,'123456','http://localhost:8000/头像.png','2021-06-29','男',2,'16723657984','4654@hh.com',1,'2021-07-30 15:07:35'),
(16,'思思',1234567904,'123456','http://localhost:8000/头像.png','2021-07-07','男',1,'17946523654','456@ss.com',1,'2021-07-30 15:10:18'),
(17,'无无',1234567905,'123456','http://localhost:8000/头像.png','2021-07-01','男',2,'14894652685','1654@ww.com',1,'2021-07-30 15:15:19');

/*Table structure for table `test` */

DROP TABLE IF EXISTS `test`;

CREATE TABLE `test` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

/*Data for the table `test` */

insert  into `test`(`id`,`url`) values 
(22,'http://localhost:8000/upload_7a108cbdb712c319b6a14bd6be325668.png'),
(23,'http://localhost:8000/upload_e50e844afa3661985c9af971bd5e3953.png'),
(24,'http://localhost:8000/upload_c0d739b738e16e4b45f8f9e35c098480.png'),
(25,'http://localhost:8000/upload_fd20672fd8e9c7981364c239b55904f8.png');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
