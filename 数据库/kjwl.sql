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
  `kjel_u_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`kjwl_u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_user` */

insert  into `kjwl_pc_user`(`kjwl_u_id`,`kjwl_u_name`,`kjwl_u_account`,`kjwl_u_password`,`kjwl_u_portrait`,`kjwl_u_birthdate`,`kjwl_u_sex`,`kjwl_u_identity`,`kjwl_u_phone`,`kjwl_u_email`,`kjel_u_datetime`) values 
(1,'小红',1234567890,'123456',NULL,'1999-04-14','女',1,'18978951265','456789123@qq.com','2021-06-30 19:43:52'),
(2,'小明',1234567891,'987456',NULL,'1993-08-21','男',1,'15648975264','789456123@qq.com','2021-06-30 19:45:36'),
(3,'小刚',1234567892,'011qaz',NULL,'1999-10-17','男',1,'13945678541','741852963@136.com','2021-06-30 19:46:49'),
(4,'yiyi',1294784589,'123456','http://localhost:8000/头像.png','1995-11-24','女',2,'15504651106','1234784569@qq.com','2021-07-05 18:59:56'),
(5,'erer',1234567893,'qazwsx','http://localhost:8000/头像.png','1979-12-14','女',2,'12345698720','7898529634@163.com','2021-07-05 19:01:35'),
(6,'sansan',1234567894,'123456','http://localhost:8000/头像.png','2021-07-25','男',1,'12345698554','123@456.com','2021-07-05 20:19:20'),
(7,'思思',1234567895,'123456','http://localhost:8000/头像.png','1999-07-14','女',1,'12345678952','4897@1564qq.com','2021-07-05 20:24:02'),
(8,'liuliu',1234567896,'123456','http://localhost:8000/头像.png','1999-08-12','女',2,'12345678952','123@789.com','2021-07-05 20:28:07');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
