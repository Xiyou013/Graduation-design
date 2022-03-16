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

/*Table structure for table `imgtest` */

DROP TABLE IF EXISTS `imgtest`;

CREATE TABLE `imgtest` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `imgtest` */

insert  into `imgtest`(`id`,`url`) values 
(1,'http://localhost:8000/upload_faa9af4fdfc29bb49cdd5f06677f50fa.png'),
(2,'http://localhost:8000/upload_f33bf729c9bf02c1a945a9e49452d493.png');

/*Table structure for table `kjwl_pc_basic_enterprise` */

DROP TABLE IF EXISTS `kjwl_pc_basic_enterprise`;

CREATE TABLE `kjwl_pc_basic_enterprise` (
  `kjwl_e_id` int(2) NOT NULL AUTO_INCREMENT,
  `kjwl_e_portrait` varchar(70) DEFAULT NULL,
  `kjwl_e_name` varchar(50) DEFAULT NULL,
  `kjwl_e_lrpeople` varchar(20) DEFAULT NULL,
  `kjwl_e_setdate` varchar(30) DEFAULT NULL,
  `kjwl_e_regcapital` varchar(20) DEFAULT NULL,
  `kjwl_e_phone` varchar(11) DEFAULT NULL,
  `kjwl_e_website` varchar(100) DEFAULT NULL,
  `kjwl_e_email` varchar(20) DEFAULT NULL,
  `kjwl_e_address` varchar(50) DEFAULT NULL,
  `kjwl_e_status` int(2) DEFAULT '1',
  `kjwl_e_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`kjwl_e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_basic_enterprise` */

insert  into `kjwl_pc_basic_enterprise`(`kjwl_e_id`,`kjwl_e_portrait`,`kjwl_e_name`,`kjwl_e_lrpeople`,`kjwl_e_setdate`,`kjwl_e_regcapital`,`kjwl_e_phone`,`kjwl_e_website`,`kjwl_e_email`,`kjwl_e_address`,`kjwl_e_status`,`kjwl_e_datetime`) values 
(1,'http://localhost:8000/upload_731ab56467329c4402d7aad58641e0ec.png','公司名称','法定代表人','2021-08-25','10','012-3456789','www.123.com','123@qq.com','地址',1,'2021-08-25 14:44:45'),
(2,'http://localhost:8000/暂无图片(2).png','为空测试','-','-','-','-','-','-','-',1,'2021-08-26 11:12:38'),
(3,'http://localhost:8000/暂无图片(2).png','456','789','2021-08-25','10','013-2456789','www.xxx','465@123.com','sdfgf ',1,'2021-08-25 15:05:24'),
(4,'http://localhost:8000/暂无图片(2).png','456','789','2021-08-25','10','013-2456789','www.xxx','465@123.com','sdfgf ',1,'2021-08-25 15:08:43'),
(5,'http://localhost:8000/暂无图片(2).png','456','789','2021-08-25','10','013-2456789','www.xxx','465@123.com','sdfgf ',1,'2021-08-25 15:10:20'),
(6,'http://localhost:8000/暂无图片(2).png','456','789','2021-08-25','10','013-2456789','www.xxx','465@123.com','sdfgf ',1,'2021-08-25 15:11:52'),
(7,'http://localhost:8000/暂无图片(2).png','456','789','2021-08-25','10','013-2456789','www.xxx','465@123.com','sdfgf ',1,'2021-08-25 15:12:40'),
(8,'http://localhost:8000/暂无图片(2).png','456','789','2021-08-25','10','013-2456789','www.xxx','465@123.com','sdfgf ',1,'2021-08-25 15:15:32'),
(9,'http://localhost:8000/暂无图片(2).png','456','789','2021-08-25','10','013-2456789','www.xxx','465@123.com','sdfgf ',1,'2021-08-25 15:16:20'),
(10,'http://localhost:8000/upload_9be95c1d9321e13a8e166b0c0d17f119.png','456','789','2021-08-25','10','012-3456789','-','465@123.com','sdfgf ',1,'2021-08-26 11:09:16'),
(11,'http://localhost:8000/暂无图片(2).png','mingc','fadingdaibiaoren','2021-08-25','11','014-2356789','http://hjk.com','hj@bn.com','dihzi',1,'2021-08-25 15:32:44'),
(12,'http://localhost:8000/upload_0289abfde8c4f5e4716ce012982572a3.png','公司名称','法定代表人','2021-08-25','12','13245678901','www.cc.com','cc@cc.com','地址',1,'2021-08-25 15:37:46'),
(13,'http://localhost:8000/upload_0289abfde8c4f5e4716ce012982572a3.png','公司名称','法定代表人','2021-08-25','12','13245678901','www.cc.com','cc@cc.com','地址',1,'2021-08-25 15:39:48'),
(14,'http://localhost:8000/upload_0289abfde8c4f5e4716ce012982572a3.png','公司名称','法定代表人','2021-08-25','12','13245678901','www.cc.com','cc@cc.com','地址',1,'2021-08-25 15:41:36'),
(15,'http://localhost:8000/upload_0289abfde8c4f5e4716ce012982572a3.png','公司名称','法定代表人','2021-08-25','12','13245678901','www.cc.com','cc@cc.com','地址',1,'2021-08-25 15:43:42'),
(16,'http://localhost:8000/upload_184e00aad4f9bcb87bf1917cba2180e2.png','联动测试1','-','-','-','-','-','-','-',1,'2021-08-26 11:22:53'),
(17,'http://localhost:8000/暂无图片(2).png','联动测试2','-','-','-','-','-','-','-',1,'2021-08-26 11:23:25'),
(18,'http://localhost:8000/暂无图片(2).png','联调测试3','-','-','-','-','-','-','-',1,'2021-08-26 18:43:52'),
(19,'http://localhost:8000/暂无图片(2).png','联调测试3','-','-','-','-','-','-','-',1,'2021-08-26 18:46:06'),
(20,'http://localhost:8000/暂无图片(2).png','联调为空测试1','-','-','-','-','-','-','-',1,'2021-08-26 19:20:27'),
(21,'http://localhost:8000/暂无图片(2).png','标签测试1','-','-','-','-','-','-','-',1,'2021-08-27 16:23:29'),
(22,'http://localhost:8000/暂无图片(2).png','详情测试1【宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司】','请输入法定代表人','2021-08-27','100','012-3456789','http://www.thelongestdomainnameintheworldandthensomeandthensomemoreandmore.com/','1234997805@qq.com','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司',1,'2021-08-27 17:10:43');

/*Table structure for table `kjwl_pc_basic_news` */

DROP TABLE IF EXISTS `kjwl_pc_basic_news`;

CREATE TABLE `kjwl_pc_basic_news` (
  `kjwl_n_id` int(10) NOT NULL AUTO_INCREMENT,
  `kjwl_n_name` varchar(100) DEFAULT NULL,
  `kjwl_n_source` varchar(100) DEFAULT NULL,
  `kjwl_n_rdatetime` varchar(30) DEFAULT NULL,
  `kjwl_n_url` varchar(100) DEFAULT NULL,
  `kjwl_n_content` longtext,
  `kjwl_n_status` int(2) DEFAULT '1',
  `kjwl_n_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`kjwl_n_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_basic_news` */

insert  into `kjwl_pc_basic_news`(`kjwl_n_id`,`kjwl_n_name`,`kjwl_n_source`,`kjwl_n_rdatetime`,`kjwl_n_url`,`kjwl_n_content`,`kjwl_n_status`,`kjwl_n_datetime`) values 
(1,'123','456','2021-08-19 10:21:14','789','\"<p>123465789新闻内容</p>\"',0,'2021-08-20 14:32:48'),
(2,'模拟新闻标题','模拟新闻来源','2021-08-19 10:23:44','模拟新闻链接','\"<p>123465789新闻内容</p>\"',1,'2021-08-20 11:53:51'),
(3,'模拟新闻标题3','模拟新闻来源3','2021-08-19 10:25:43','模拟新闻链接3','\"<p>当地时间8月19日，阿富汗塔利班发言人扎比胡拉·穆贾希德在社交网站发表声明，在阿富汗脱离英国统治、独立102周年纪念日之际，<a href=\\\"https://s.weibo.com/weibo?q=%23%E5%A1%94%E5%88%A9%E7%8F%AD%E5%AE%A3%E5%B8%83%E6%88%90%E7%AB%8B%E9%98%BF%E5%AF%8C%E6%B1%97%E4%BC%8A%E6%96%AF%E5%85%B0%E9%85%8B%E9%95%BF%E5%9B%BD%23\\\" target=\\\"_blank\\\">#塔利班宣布成立阿富汗伊斯兰酋长国#</a>。<br/><br/>当地时间8月17日，接管首都喀布尔的第三天，阿富汗塔利班举行了首场新闻发布会。塔利班发言人扎比胡拉·穆贾希德表示：“在解放全国后，我们对任何人都没有敌视政策，我们大赦所有组织的反对者，因为我们不再想要战争。”<br/><br/>在这场备受瞩目的发布会上，穆贾希德回应了众多阿富汗民众和国际社会关注的问题，并作出了一系列承诺，包括保障女性权益、建立包容性政府、不对其他国家构成威胁等。他表示，“阿富汗是一个穆斯林国家，不管是20年前还是现在”，但考虑到一路走来的经验，“我们和20年前相比有了巨大的变化”。<br/><br/>塔利班入主喀布尔后，将打造一个怎样的政权？对于饱受战争苦难的阿富汗人民，迎来的将是怎样的命运？南方+记者连线多位专家进行解读。<br/><br/><img src=\\\"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_org.png\\\" alt=\\\"[星星]\\\"/>建立包容性政府？仍存不确定性<br/>在塔利班宣布胜利之际，许多阿富汗人想方设法逃离这个国家。据央视新闻报道，目前喀布尔街头商店行人稀少，大部分民众倾向于待在家中，街上到处是塔利班设立的检查站并主动去询问民众的担忧。而喀布尔机场的情况仍然混乱，众多阿富汗民众和外国人争相逃离阿富汗。<br/><br/>阿富汗民众的恐慌来源于20年前。<br/><br/>1996年9月，塔利班攻占喀布尔，宣布成立“阿富汗伊斯兰酋长国”，在阿富汗实行了严酷统治，人们生活的方方面面充满禁忌：妇女被重重纱布包裹，只准露出两只眼睛，不得参加任何社会活动或受教育；男人不得剃胡子或留“美国式”发型；旅馆、饭店除宗教歌曲外，其他音乐一律不得播放……<br/><br/>20年后重掌政权，塔利班迫切想证明自己的改变。塔利班发言人沙欣曾表示，塔利班将组建一个“包容性的阿富汗政府”。穆贾希德在谈到组建政府的问题时也表示，塔利班将“组建一个有各方参与的‘伊斯兰政府’”，对于法律等问题的制定则需要等新政府成立后再具体商榷。<br/><br/>对于这一承诺，兰州大学阿富汗研究中心主任朱永彪教授表示，其实现的可能性是很大的。实际上，建立包容性政府不仅是塔利班的诉求，也是其他政治派别的共同诉求，同时也是国际社会对阿富汗新政府的希望，但是这种包容性具体能够执行到什么程度仍存较大不确定性。<br/><br/>“需要注意的是，塔利班所谓的包容性政府，前提是以遵循伊斯兰教法为基础的。”西北大学中东研究所副教授王晋提醒，在传统伊斯兰政治理念里，伊斯兰本身具有包容性，但这种包容性和现代政治制度倡导的民主、开放、男女平等等包容性理念并不相同，是遵循伊斯兰教法的基础上实施的一种社会治理。<br/><br/><img src=\\\"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_org.png\\\" alt=\\\"[星星]\\\"/>允许女性工作和学习？在伊斯兰范围内<br/>一直以来，阿富汗的妇女权益问题备受关注。自1996年塔利班占领喀布尔并掌权的5年间，阿富汗妇女在法律上被拒之于学校大门之外，无法外出工作，全身需要罩在连帽长袍中……<br/><br/>因此，20年后，塔利班再次进入喀布尔，许多阿富汗女性表达了对未来的担忧。对此，塔利班正试图将自身塑造成更加温和的形象，穆贾希德称，未来将允许女性在新的框架下工作和学习。<br/><br/>据环球网报道，塔利班在首场记者会承诺：“妇女将享有一切权利，无论是在工作还是其他活动中，我们保证妇女在伊斯兰范围内的所有权利。”塔利班表示已经准备好“为妇女提供工作和学习的环境”，但对于实际操作中如何保障女性权利，穆贾希德并未做出解释。<br/><br/>塔利班能否兑现这个承诺？或者只是塔利班掌权的权衡之计？<br/><br/>在朱永彪教授看来，在保障妇女权利上，塔利班确实表现出比以往更进步的态度，但其核心没有改变。因此，保障妇女权利具体能履行到什么程度，是否会出现反复和反弹，仍然具有很大的不确定性。<br/><br/>王晋表示，与20年前相比，塔利班主动提出允许妇女工作和学习，这是一个好的开始。但未来是否能真正推行，地方的军政领袖在实践中能否遵循等都存在问题。另外一个层面，塔利班所强调的学习，是指现代化知识还是学习宗教规则和知识、允许妇女参加的工作定义是什么，也需要进一步观察。<br/><br/>王晋解释，在一些相对保守的国家，女性也可以工作和学习，但是工作和学习限定在某些特定领域，并不是像外界所理解或期待的女性可以自由工作、自由学习。“我认为，塔利班在妇女问题上进步的幅度是在一定范围的。”<br/><br/><img src=\\\"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_org.png\\\" alt=\\\"[星星]\\\"/>守江山难：未来仍需获得国际和民众认可<br/><br/>“打江山易，守江山难”。对于长期处于战乱局面的阿富汗来说，塔利班能否坐稳江山，带领阿富汗人民走向和平与发展，仍面临不少威胁，其中，如何获得国际和其他国家对其政权的认可，是塔利班掌权必须面临的问题。<br/><br/>阿富汗是否还会成为恐怖主义滋生的温床，进而威胁到其他国家的安全？事实上，塔利班基本控制阿富汗全国后，各国政府人士以及国际社会对阿富汗未来的发展表示担忧。<br/><br/>据央视网报道，穆贾希德表示：“我们向包括美国在内的全世界做出保证，阿富汗绝对不会对包括地区邻国在内的其他国家构成威胁，我们保证绝不允许任何势力利用阿富汗领土做危害邻国等其他任何国家的事情。”<br/><br/>在朱永彪教授看来，塔利班主导组建的新政府能否获得其他国家的认可，还要看其所承诺的组建包容性政府、妇女权利保障、与恐怖主义的联系、禁止毒品生产等承诺是否能够兑现以及兑现的程度。<br/><br/>王晋则认为，总体上看，阿富汗塔利班展现出一个比较积极的状态，他们希望和外界接触，但这种接触必然会带来很多困难，其奉行伊斯兰经典政治理念并以此指导其政治实践，与西方国家一贯强调的人权、民主、妇女保护、少数民族保护等理念存在根本上的分歧，未来双方的冲突难以避免。<br/><br/>对于阿富汗国内，塔利班主导组建的新政府如何调和国内的矛盾，赢得民众信任、获得民众认同，也是不可回避的一大难题。<br/><br/>朱永彪认为，塔利班要想获得民众认同，首先需要改良自己、去“极端化”；其次是要‍‍保障民生，发展经济，提供更多工作岗位；还需要发展公益性事业，提供一个更安全的社会发展环境。<br/><br/>王晋则认为，阿富汗无论哪方掌权，都是阿富汗民众的意愿和民心所决定的，是阿富汗人民的选择，国际社会也都尊重这样的选择。阿富汗塔利班未来会面临很多挑战，但相信其能够把这些挑战都处理好。<br/></p>\"',1,'2021-08-20 11:54:25'),
(4,'123','46','2021-08-19 10:27:40','79','\"<p>123465789新闻内容</p>\"',1,'2021-08-20 11:53:30'),
(9,'123','456','2021-08-19 10:47:12','789','\"<p>123465789新闻内容</p>\"',0,'2021-08-20 14:34:48'),
(10,'标题','来源','2021-08-19 11:02:34','链接','\"<p>123465789新闻内容</p>\"',1,'2021-08-20 11:53:23'),
(11,'798','456','2021-08-19 11:04:48','132','\"<p>123465789新闻内容</p>\"',1,'2021-08-20 11:53:19'),
(12,'夺','矿','2021-08-19 11:06:29','战','\"<p>123465789新闻内容</p>\"',1,'2021-08-20 11:53:16'),
(13,'竞','技','2021-08-19 11:10:27','场','\"<p>123465789新闻内容</p>\"',1,'2021-08-20 11:53:12'),
(14,'荣耀黄金','荣耀','2021-08-19 11:12:27','黄金','\"<p>123465789新闻内容</p>\"',1,'2021-08-20 11:53:07'),
(15,'23','1','2021-08-19 17:05:27','123','\"<p>79541568454564512</p>\"',1,'2021-08-19 17:09:07'),
(16,'这是新闻标题','这是新闻来源','2021-08-19 17:30:32','这是新闻链接','\"<p>这是新闻正文</p>\"',1,'2021-08-19 17:30:46'),
(17,'标题','来源','2021-08-19 17:33:25','链接','\"<p>正文489646165465+1632145</p>\"',1,'2021-08-19 17:33:38'),
(18,'新闻1的标题(改)','新闻1的来源(改)','2021-08-20 09:36:43','新闻1的链接(改)','\"<p>新闻1的正文（改）</p>\"',1,'2021-08-20 11:48:57'),
(19,'新闻2的标题','新闻2的来源','2021-08-20 09:39:22','新闻2的链接','\"<p>新闻2的正文</p>\"',1,'2021-08-20 09:39:43'),
(20,'新闻3的标题','新闻3的来源','2021-08-20 09:40:33','新闻3的链接','\"<p>新闻3的正文</p>\"',1,'2021-08-20 09:40:49'),
(21,'新闻4的标题','新闻4的来源','2021-08-20 09:41:37','新闻4的链接','\"<p>新闻4的正文</p>\"',1,'2021-08-20 09:42:07'),
(22,'新闻5的标题','新闻5的来源','2021-08-20 09:42:37','新闻5的链接','\"<p>新闻5的正文</p>\"',1,'2021-08-20 09:43:25'),
(23,'456','465','2021-08-23 11:55:14','13','\"<p>465</p>\"',1,'2021-08-23 11:55:15'),
(24,'j','k','2021-08-23 00:00:00','k','\"\"',1,'2021-08-23 14:14:44'),
(25,'为空测试','-','-','-','\"<p>为空测试</p>\"',1,'2021-08-25 11:42:40'),
(26,'联动测试1','-','-','-','\"<p>联动测试1<br/></p>\"',1,'2021-08-26 11:26:50'),
(27,'联动测试2','-','-','-','\"<p>联动测试2<br/></p>\"',1,'2021-08-26 11:27:14'),
(28,'联调内容测试1','-','-','-','\"<p></p><p>联调内容测试1</p>\"',1,'2021-08-27 15:45:05'),
(29,'宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','2021-08-30 00:00:00','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','\"<p>宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司<br/></p>\"',1,'2021-08-30 16:47:01');

/*Table structure for table `kjwl_pc_basic_person` */

DROP TABLE IF EXISTS `kjwl_pc_basic_person`;

CREATE TABLE `kjwl_pc_basic_person` (
  `kjwl_p_id` int(2) NOT NULL AUTO_INCREMENT,
  `kjwl_p_portrait` varchar(100) DEFAULT NULL,
  `kjwl_p_name` varchar(10) DEFAULT NULL,
  `kjwl_p_birthdate` varchar(30) DEFAULT NULL,
  `kjwl_p_position` varchar(50) DEFAULT NULL,
  `kjwl_p_enterprise` varchar(50) DEFAULT NULL,
  `kjwl_p_record` longtext,
  `kjwl_p_status` int(2) DEFAULT '1',
  `kjwl_p_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`kjwl_p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_basic_person` */

insert  into `kjwl_pc_basic_person`(`kjwl_p_id`,`kjwl_p_portrait`,`kjwl_p_name`,`kjwl_p_birthdate`,`kjwl_p_position`,`kjwl_p_enterprise`,`kjwl_p_record`,`kjwl_p_status`,`kjwl_p_datetime`) values 
(1,'http://localhost:8000/人物(1).png','123','2021-08-23','12','789','[{\"rcontent\":\"456\"},{\"rcontent\":\"789\"}]',1,'2021-08-23 11:07:33'),
(2,'http://localhost:8000/人物(1).png','老板姓名','2021-08-23','职务','任职企业','[{\"rcontent\":\"任职履历1\"},{\"rcontent\":\"认知履历2\"},{\"rcontent\":\"任职履历3\"}]',1,'2021-08-23 11:11:59'),
(3,'http://localhost:8000/人物(1).png','大老板','2021-08-23','元帅','帝国','[{\"rcontent\":\"帝国中将\"},{\"rcontent\":\"帝国上将\"},{\"rcontent\":\"帝国元帅\"}]',1,'2021-08-23 14:28:16'),
(4,'http://localhost:8000/upload_9a43044d732c5bd74cc48ba2ab5615dc.png','益肤','2021-08-23','研究','南京天纵易康生物科技股份有限公司','[{\"rcontent\":\"南京市江北新区星火路10号鼎业百泰生物大楼A座1103-1105室\"},{\"rcontent\":\"B座102室\"},{\"rcontent\":\"E座三层和E座101室\"}]',1,'2021-08-23 16:27:15'),
(5,'http://localhost:8000/暂无图片(2).png','456','2021-08-03','456','123','[{\"rcontent\":\"hjv\"}]',1,'2021-08-24 11:45:16'),
(6,'http://localhost:8000/upload_fc86b36c0f2800fa47b553dca39ac3ad.png','都市牧场','2021-08-05','生产','广东新乐食品有限公司','[{\"rcontent\":\"广东新乐\"}]',1,'2021-08-23 16:34:38'),
(7,'http://localhost:8000/upload_44c2c0657374c000e595ecebabfee298.png','都','2021-08-05','生产','广东','[{\"rcontent\":\"广东新乐\"}]',1,'2021-08-23 16:39:58'),
(8,'http://localhost:8000/upload_8ee240d6282e4371577ca51b79277971.png','姓名测试(*)','2021-08-10','职务测试(*)','任职企业测试(*)','[{\"rcontent\":\"任职履历2测试\"},{\"rcontent\":\"任职履历3测试\"}]',1,'2021-08-24 11:35:23'),
(9,'http://localhost:8000/暂无图片(2).png','为空测试','','-','-','[]',1,'2021-08-25 11:08:49'),
(10,'http://localhost:8000/暂无图片(2).png','为空测试2','-','-','-','[]',1,'2021-08-25 11:09:45'),
(11,'http://localhost:8000/暂无图片(2).png','为空测试3','-','-','-','[]',1,'2021-08-25 11:11:29'),
(12,'http://localhost:8000/暂无图片(2).png','为空测试4','-','-','-','[]',1,'2021-08-25 11:12:09'),
(13,'http://localhost:8000/暂无图片(2).png','为空测试5','-','-','-','[{\"rcontent\":\"-\"}]',1,'2021-08-25 11:13:05'),
(14,'http://localhost:8000/暂无图片(2).png','为空测试6','-','-','-','[{\"rcontent\":\"-\"}]',1,'2021-08-25 11:18:06'),
(15,'http://localhost:8000/暂无图片(2).png','为空测试6','-','-','-','[{\"rcontent\":\"-\"}]',1,'2021-08-25 11:27:33'),
(16,'http://localhost:8000/暂无图片(2).png','联动测试','-','-','-','[{\"rcontent\":\"-\"}]',1,'2021-08-26 11:25:15'),
(17,'http://localhost:8000/upload_cf913f766a120a19104f0130f2e6f5c2.png','联动测试2','-','-','-','[{\"rcontent\":\"-\"}]',1,'2021-08-26 11:25:54'),
(18,'http://localhost:8000/暂无图片(2).png','联调测试4','-','-','-','[{\"rcontent\":\"-\"}]',1,'2021-08-27 11:01:07'),
(19,'http://localhost:8000/暂无图片(2).png','联调测试3','-','-','-','[{\"rcontent\":\"-\"}]',1,'2021-08-27 11:02:13'),
(20,'http://localhost:8000/暂无图片(2).png','标签测试1','2021-08-27','经筵日讲官太保兼太子太保保和殿大学士兼管吏部尚书翰林院掌院学士事世袭三等伯','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','[{\"rcontent\":\"31245678965423145678954613456897564231456897546321456\"}]',1,'2021-08-27 16:43:16');

/*Table structure for table `kjwl_pc_elabel` */

DROP TABLE IF EXISTS `kjwl_pc_elabel`;

CREATE TABLE `kjwl_pc_elabel` (
  `kjwl_e_id` int(2) DEFAULT NULL,
  `kjwl_el_name` varchar(100) DEFAULT NULL,
  `kjwl_el_status` int(2) DEFAULT '1',
  `kjwl_el_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_elabel` */

insert  into `kjwl_pc_elabel`(`kjwl_e_id`,`kjwl_el_name`,`kjwl_el_status`,`kjwl_el_datetime`) values 
(1,'公司标签1',1,'2021-08-25 14:44:45'),
(1,'公司标签2',1,'2021-08-25 14:44:45'),
(1,'公司标签3',1,'2021-08-25 14:44:45'),
(2,'-',1,'2021-08-25 14:52:08'),
(3,'公司标签3',1,'2021-08-25 15:05:24'),
(3,'公司标签1',1,'2021-08-25 15:05:24'),
(4,'公司标签3',1,'2021-08-25 15:08:43'),
(4,'公司标签1',1,'2021-08-25 15:08:43'),
(5,'公司标签1',1,'2021-08-25 15:10:20'),
(5,'公司标签3',1,'2021-08-25 15:10:20'),
(6,'公司标签1',1,'2021-08-25 15:11:52'),
(6,'公司标签3',1,'2021-08-25 15:11:52'),
(7,'公司标签1',1,'2021-08-25 15:12:40'),
(7,'公司标签3',1,'2021-08-25 15:12:40'),
(8,'公司标签3',1,'2021-08-25 15:15:32'),
(8,'公司标签1',1,'2021-08-25 15:15:32'),
(9,'公司标签1',1,'2021-08-25 15:16:20'),
(9,'公司标签3',1,'2021-08-25 15:16:20'),
(10,'公司标签1',0,'2021-08-26 11:06:09'),
(10,'公司标签3',0,'2021-08-26 11:06:09'),
(11,'biaoqian2',1,'2021-08-25 15:32:44'),
(11,'baiqoian3',1,'2021-08-25 15:32:44'),
(11,'biaoqian1',1,'2021-08-25 15:32:44'),
(12,'标签1',1,'2021-08-25 15:37:46'),
(12,'标签2',1,'2021-08-25 15:37:46'),
(12,'标签3',1,'2021-08-25 15:37:46'),
(13,'标签1',1,'2021-08-25 15:39:48'),
(13,'标签3',1,'2021-08-25 15:39:48'),
(13,'标签2',1,'2021-08-25 15:39:48'),
(14,'标签3',1,'2021-08-25 15:41:36'),
(14,'标签2',1,'2021-08-25 15:41:36'),
(14,'标签1',1,'2021-08-25 15:41:36'),
(15,'标签1',1,'2021-08-25 15:43:42'),
(15,'标签2',1,'2021-08-25 15:43:42'),
(15,'标签3',1,'2021-08-25 15:43:42'),
(10,'公司标签1',0,'2021-08-26 11:08:21'),
(10,'公司标签3',0,'2021-08-26 11:08:21'),
(10,'这是添加的标签1',0,'2021-08-26 11:08:21'),
(10,'公司标签1',0,'2021-08-26 11:09:16'),
(10,'公司标签3',0,'2021-08-26 11:09:16'),
(10,'这是添加的标签1',0,'2021-08-26 11:09:16'),
(10,'公司标签1',1,'2021-08-26 11:09:16'),
(10,'公司标签3',1,'2021-08-26 11:09:16'),
(10,'这是添加的标签1',1,'2021-08-26 11:09:16'),
(16,'标签1',0,'2021-08-26 19:17:14'),
(16,'标签2',0,'2021-08-26 19:17:14'),
(17,'789',1,'2021-08-26 11:23:25'),
(17,'456',1,'2021-08-26 11:23:25'),
(18,'-',1,'2021-08-26 18:43:52'),
(19,'-',1,'2021-08-26 18:46:06'),
(16,'标签1',0,'2021-08-26 19:19:22'),
(16,'标签2',0,'2021-08-26 19:19:22'),
(16,'标签1',1,'2021-08-26 19:19:22'),
(16,'标签2',1,'2021-08-26 19:19:22'),
(20,'-',0,'2021-08-26 19:21:51'),
(20,'-',1,'2021-08-26 19:21:51'),
(21,'1256421564',0,'2021-08-27 16:24:06'),
(21,'1256421564',0,'2021-08-27 16:27:05'),
(21,'1256421564',1,'2021-08-27 16:27:05'),
(21,'231456789564123546',1,'2021-08-27 16:27:05'),
(21,'231456789456123456789456123456789123456789',1,'2021-08-27 16:27:05'),
(22,'45612356489',1,'2021-08-27 17:10:43'),
(22,'12345678945623154678945623154789456321',1,'2021-08-27 17:10:43');

/*Table structure for table `kjwl_pc_maincharacter` */

DROP TABLE IF EXISTS `kjwl_pc_maincharacter`;

CREATE TABLE `kjwl_pc_maincharacter` (
  `kjwl_e_id` int(2) DEFAULT NULL,
  `kjwl_p_id` int(2) DEFAULT NULL,
  `kjwl_ep_status` int(2) DEFAULT '1',
  `kjwl_ep_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_maincharacter` */

insert  into `kjwl_pc_maincharacter`(`kjwl_e_id`,`kjwl_p_id`,`kjwl_ep_status`,`kjwl_ep_datetime`) values 
(19,6,1,'2021-08-26 18:46:06'),
(19,15,1,'2021-08-26 18:46:06'),
(16,4,1,'2021-08-26 19:19:22'),
(16,8,1,'2021-08-26 19:19:22'),
(16,17,1,'2021-08-26 19:19:22'),
(20,7,1,'2021-08-26 19:21:51');

/*Table structure for table `kjwl_pc_nenterprise` */

DROP TABLE IF EXISTS `kjwl_pc_nenterprise`;

CREATE TABLE `kjwl_pc_nenterprise` (
  `kjwl_n_id` int(2) DEFAULT NULL,
  `kjwl_e_id` int(2) DEFAULT NULL,
  `kjwl_ne_status` int(2) DEFAULT '1',
  `kjwl_ne_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_nenterprise` */

insert  into `kjwl_pc_nenterprise`(`kjwl_n_id`,`kjwl_e_id`,`kjwl_ne_status`,`kjwl_ne_datetime`) values 
(28,10,1,'2021-08-27 15:45:05'),
(28,1,1,'2021-08-27 15:45:05'),
(26,16,1,'2021-08-27 16:13:38'),
(26,12,1,'2021-08-27 16:13:38'),
(29,22,1,'2021-08-30 16:47:01');

/*Table structure for table `kjwl_pc_nlabel` */

DROP TABLE IF EXISTS `kjwl_pc_nlabel`;

CREATE TABLE `kjwl_pc_nlabel` (
  `kjwl_n_id` int(10) NOT NULL,
  `kjwl_nl_name` varchar(100) DEFAULT NULL,
  `kjwl_nl_status` int(2) DEFAULT '1',
  `kjwl_nl_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_nlabel` */

insert  into `kjwl_pc_nlabel`(`kjwl_n_id`,`kjwl_nl_name`,`kjwl_nl_status`,`kjwl_nl_datetime`) values 
(9,'132',1,'2021-08-19 11:01:13'),
(9,'46',1,'2021-08-19 11:01:13'),
(9,'科技网络',1,'2021-08-19 11:01:13'),
(10,'标签1',1,'2021-08-19 11:02:59'),
(10,'标签2',1,'2021-08-19 11:02:59'),
(10,'标签3',1,'2021-08-19 11:02:59'),
(11,'1',1,'2021-08-19 11:05:01'),
(11,'2',1,'2021-08-19 11:05:01'),
(11,'3',1,'2021-08-19 11:05:01'),
(12,'夺',1,'2021-08-19 11:06:53'),
(12,'矿',1,'2021-08-19 11:06:53'),
(12,'战',1,'2021-08-19 11:06:53'),
(13,'竞',1,'2021-08-19 11:10:48'),
(13,'技',1,'2021-08-19 11:10:48'),
(13,'场',1,'2021-08-19 11:10:48'),
(14,'荣耀',1,'2021-08-19 11:12:41'),
(14,'黄金',1,'2021-08-19 11:12:41'),
(15,'456468',1,'2021-08-19 17:09:07'),
(15,'489646531',1,'2021-08-19 17:09:07'),
(16,'标签1',1,'2021-08-19 17:30:46'),
(16,'标签2',1,'2021-08-19 17:30:46'),
(17,'123',1,'2021-08-19 17:33:38'),
(17,'456',1,'2021-08-19 17:33:38'),
(18,'新闻1的标签1',0,'2021-08-20 11:49:30'),
(18,'新闻1的标签2',1,'2021-08-20 11:50:41'),
(19,'新闻2的标签1',1,'2021-08-20 09:39:43'),
(20,'新闻3的标签',1,'2021-08-20 09:40:49'),
(21,'新闻4的标签',1,'2021-08-20 09:42:07'),
(22,'新闻5的标签',1,'2021-08-20 09:43:25'),
(18,'新闻1的标签1',1,'2021-08-20 11:49:30'),
(18,'新闻1的标签2',0,'2021-08-20 11:50:19'),
(18,'新闻1的标签3',1,'2021-08-20 11:49:30'),
(23,'456',1,'2021-08-23 11:55:15'),
(25,'-',0,'2021-08-25 11:50:05'),
(25,'-',1,'2021-08-25 11:50:05'),
(26,'标签1',0,'2021-08-27 16:09:10'),
(26,'标签2',0,'2021-08-27 16:09:10'),
(26,'标签3',0,'2021-08-27 16:09:10'),
(27,'231',1,'2021-08-26 11:27:14'),
(27,'789',1,'2021-08-26 11:27:14'),
(28,'-',1,'2021-08-27 15:45:05'),
(26,'标签1',0,'2021-08-27 16:13:38'),
(26,'标签2',0,'2021-08-27 16:13:38'),
(26,'标签3',0,'2021-08-27 16:13:38'),
(26,'标签1',1,'2021-08-27 16:13:38'),
(26,'标签2',1,'2021-08-27 16:13:38'),
(26,'标签3',1,'2021-08-27 16:13:38'),
(4,'4894123',1,'2021-08-30 16:37:19'),
(4,'5486',1,'2021-08-30 16:37:19'),
(29,'宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司',1,'2021-08-30 16:47:01'),
(29,'宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司',1,'2021-08-30 16:47:01');

/*Table structure for table `kjwl_pc_nperson` */

DROP TABLE IF EXISTS `kjwl_pc_nperson`;

CREATE TABLE `kjwl_pc_nperson` (
  `kjwl_n_id` int(2) DEFAULT NULL,
  `kjwl_p_id` int(2) DEFAULT NULL,
  `kjwl_np_status` int(2) DEFAULT '1',
  `kjwl_np_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_nperson` */

insert  into `kjwl_pc_nperson`(`kjwl_n_id`,`kjwl_p_id`,`kjwl_np_status`,`kjwl_np_datetime`) values 
(28,6,1,'2021-08-27 15:45:05'),
(28,3,1,'2021-08-27 15:45:05'),
(26,8,1,'2021-08-27 16:13:38'),
(26,17,1,'2021-08-27 16:13:38'),
(29,20,1,'2021-08-30 16:47:01');

/*Table structure for table `kjwl_pc_plabel` */

DROP TABLE IF EXISTS `kjwl_pc_plabel`;

CREATE TABLE `kjwl_pc_plabel` (
  `kjwl_p_id` int(2) NOT NULL,
  `kjwl_pl_name` varchar(100) DEFAULT NULL,
  `kjwl_pl_status` int(2) DEFAULT '1',
  `kjwl_p_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_plabel` */

insert  into `kjwl_pc_plabel`(`kjwl_p_id`,`kjwl_pl_name`,`kjwl_pl_status`,`kjwl_p_datetime`) values 
(1,'456',1,'2021-08-23 11:07:33'),
(1,'123',1,'2021-08-23 11:07:33'),
(2,'人物标签1',1,'2021-08-23 11:11:59'),
(2,'人物标签3',1,'2021-08-24 11:04:47'),
(2,'人物标签2',1,'2021-08-24 11:05:23'),
(3,'深井冰',1,'2021-08-23 14:28:16'),
(3,'高',1,'2021-08-23 14:28:16'),
(3,'冷酷',1,'2021-08-23 14:28:16'),
(4,'医药用品',1,'2021-08-23 16:27:15'),
(4,'护肤',1,'2021-08-23 16:27:15'),
(5,'fgh',1,'2021-08-23 16:31:12'),
(6,'清新糖',1,'2021-08-23 16:34:38'),
(6,'食品',1,'2021-08-23 16:34:38'),
(7,'789',1,'2021-08-23 16:39:58'),
(7,'糖',1,'2021-08-23 16:39:58'),
(7,'456',1,'2021-08-23 16:39:58'),
(8,'标签1测试',0,'2021-08-24 11:35:23'),
(8,'标签2测试',0,'2021-08-24 11:35:23'),
(8,'标签3测试',0,'2021-08-24 11:35:23'),
(8,'标签1测试',1,'2021-08-24 11:35:23'),
(8,'标签2测试',1,'2021-08-24 11:35:23'),
(11,'-',1,'2021-08-25 11:11:29'),
(11,'-',1,'2021-08-25 11:11:29'),
(11,'-',1,'2021-08-25 11:11:29'),
(12,'-',1,'2021-08-25 11:12:09'),
(12,NULL,1,'2021-08-25 11:12:09'),
(12,NULL,1,'2021-08-25 11:12:09'),
(13,'-',1,'2021-08-25 11:13:05'),
(14,'-',0,'2021-08-25 11:32:14'),
(15,'-',0,'2021-08-25 11:35:27'),
(14,'-',1,'2021-08-25 11:32:14'),
(15,'-',1,'2021-08-25 11:35:27'),
(16,'标签1',1,'2021-08-26 11:25:15'),
(16,'标签2',1,'2021-08-26 11:25:15'),
(17,'456',1,'2021-08-26 11:25:54'),
(17,'789',1,'2021-08-26 11:25:54'),
(17,'123',1,'2021-08-26 11:25:54'),
(18,'-',1,'2021-08-27 11:01:07'),
(19,'-',0,'2021-08-27 11:19:08'),
(19,'-',1,'2021-08-27 11:19:08'),
(20,'123456',0,'2021-08-27 16:43:16'),
(20,'124658974523156487945632456789654231456879465231',0,'2021-08-27 16:43:16'),
(20,'123456',1,'2021-08-27 16:43:16'),
(20,'124658974523156487945632456789654231456879465231',1,'2021-08-27 16:43:16');

/*Table structure for table `kjwl_pc_pnews` */

DROP TABLE IF EXISTS `kjwl_pc_pnews`;

CREATE TABLE `kjwl_pc_pnews` (
  `kjwl_p_id` int(2) DEFAULT NULL,
  `kjwl_n_id` int(2) DEFAULT NULL,
  `kjwl_pn_status` int(2) DEFAULT '1',
  `kjwl_pn_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_pnews` */

insert  into `kjwl_pc_pnews`(`kjwl_p_id`,`kjwl_n_id`,`kjwl_pn_status`,`kjwl_pn_datetime`) values 
(19,14,0,'2021-08-27 11:19:08'),
(19,18,0,'2021-08-27 11:19:08'),
(19,15,1,'2021-08-27 11:19:08'),
(19,22,1,'2021-08-27 11:19:08');

/*Table structure for table `kjwl_pc_specific_enterprise` */

DROP TABLE IF EXISTS `kjwl_pc_specific_enterprise`;

CREATE TABLE `kjwl_pc_specific_enterprise` (
  `kjwl_e_id` int(2) DEFAULT NULL,
  `kjwl_e_type` varchar(50) DEFAULT NULL,
  `kjwl_e_ename` varchar(50) DEFAULT NULL,
  `kjwl_e_fname` varchar(50) DEFAULT NULL,
  `kjwl_e_concapital` varchar(20) DEFAULT NULL,
  `kjwl_e_ginsengnum` varchar(10) DEFAULT NULL,
  `kjwl_e_staffnum` varchar(20) DEFAULT NULL,
  `kjwl_e_utscc` varchar(70) DEFAULT NULL,
  `kjwl_e_taxpayernum` varchar(70) DEFAULT NULL,
  `kjwl_e_bregnum` varchar(70) DEFAULT NULL,
  `kjwl_e_taxpayerqua` varchar(50) DEFAULT NULL,
  `kjwl_e_orgcode` varchar(70) DEFAULT NULL,
  `kjwl_e_iaeecode` varchar(70) DEFAULT NULL,
  `kjwl_e_industry` varchar(50) DEFAULT NULL,
  `kjwl_e_businessterm` varchar(30) DEFAULT NULL,
  `kjwl_e_regauthority` varchar(50) DEFAULT NULL,
  `kjwl_e_approvaldate` varchar(30) DEFAULT NULL,
  `kjwl_e_businessscope` longtext,
  `kjwl_e_resume` longtext,
  `kjwl_e_status` int(2) DEFAULT '1',
  `kjwl_e_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_specific_enterprise` */

insert  into `kjwl_pc_specific_enterprise`(`kjwl_e_id`,`kjwl_e_type`,`kjwl_e_ename`,`kjwl_e_fname`,`kjwl_e_concapital`,`kjwl_e_ginsengnum`,`kjwl_e_staffnum`,`kjwl_e_utscc`,`kjwl_e_taxpayernum`,`kjwl_e_bregnum`,`kjwl_e_taxpayerqua`,`kjwl_e_orgcode`,`kjwl_e_iaeecode`,`kjwl_e_industry`,`kjwl_e_businessterm`,`kjwl_e_regauthority`,`kjwl_e_approvaldate`,`kjwl_e_businessscope`,`kjwl_e_resume`,`kjwl_e_status`,`kjwl_e_datetime`) values 
(2,'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','\"-\"','\"-\"',1,'2021-08-25 14:52:08'),
(4,'7','bugufyd','456','100','20','200','dfgh','jokkm','-','-','-','-','-','-','-','-','\"-\"','\"-\"',1,'2021-08-26 10:51:58'),
(6,'7','bugufyd','456','100','20','200','dfgh','jokkm','vyg','756','hg','dgfdg','-','-','-','-','\"-\"','\"-\"',1,'2021-08-26 10:52:04'),
(8,'7','bugufyd','456','100','20','200','dfgh','jokkm','vyg','756','hg','dgfdg','763','-','-','-','\"-\"','\"-\"',1,'2021-08-26 10:52:21'),
(10,'7','bugufyd','-','-','0','20','dfgh','jokkm','vyg','756','hg','dgfdg','医药','2021-08-01至2021-08-25','-','2021-08-01','\"<p>-fad</p>\"','\"<p>-456</p>\"',1,'2021-08-26 11:06:09'),
(11,'leixing','yongwenming','cengyongm','110','21','210','shehuixinyong','nashuirenshibiehao','gongshangzucehao','nashuirenzihi','zuzhijigou','jinchukouqiye','suoshuhangye','2021-08-01至2021-08-21','dengjijiguan','2021-08-17','\"<p>jingyingfanwei</p>\"','\"<p>jianjie</p>\"',1,'2021-08-25 15:32:44'),
(15,'企业类型','ying.wen.ming','曾用名','120','22','220','she-hui-tong-yi-xin-yong-dai-ma','na-shui-ren-shi-bie-hao','gong-shang-zu-ce-hao','纳税人资质','zu-zhi-ji-gou-dai-ma','jin-chu-kou-qi-ye','所属行业','2021-08-01至2021-08-31','登记机关','2021-08-01','\"<p>这是经营范围</p>\"','\"<p>这是简介</p>\"',1,'2021-08-25 15:43:42'),
(16,'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','\"<p>联动测试</p>\"','\"<p>联动测试</p>\"',1,'2021-08-26 11:22:53'),
(17,'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','\"<p>联动测试</p>\"','\"<p>2</p>\"',1,'2021-08-26 11:23:25'),
(19,'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','\"-\"','\"-\"',1,'2021-08-26 18:46:06'),
(20,'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','\"<p>-</p>\"','\"<p>-</p>\"',1,'2021-08-26 19:21:51'),
(21,'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','\"<p>-</p>\"','\"<p>-</p>\"',1,'2021-08-27 16:24:06'),
(22,'宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','qing.shu.ru.ying.wen.ming.zui.hai.shi.hen.chnag.de','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','100','200','200','qing-shu-ru-tong-yi-she-hui-xin-yong-dai-ma','qing-shu-ru-na-shui-ren-shi-bie-hao','qing-shu-ru-gong-shang-zhu-ce-hao','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','qing-shu-ru-zu-zhi-ji-gou-dai-ma','wing-shu-ru-jin-chu-kou-qi-ye-dai-ma','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','2021-08-01至2021-08-10','宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司','2021-08-26','\"-\"','\"-\"',1,'2021-08-27 17:10:43');

/*Table structure for table `kjwl_pc_specific_person` */

DROP TABLE IF EXISTS `kjwl_pc_specific_person`;

CREATE TABLE `kjwl_pc_specific_person` (
  `kjwl_p_id` int(2) NOT NULL,
  `kjwl_p_graduateschool` varchar(20) DEFAULT NULL,
  `kjwl_p_professional` varchar(20) DEFAULT NULL,
  `kjwl_p_recordschool` varchar(20) DEFAULT NULL,
  `kjwl_p_experience` longtext,
  `kjwl_p_resume` longtext,
  `kjwl_p_event` longtext,
  `kjwl_p_status` int(2) DEFAULT '1',
  `kjwl_p_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_specific_person` */

insert  into `kjwl_pc_specific_person`(`kjwl_p_id`,`kjwl_p_graduateschool`,`kjwl_p_professional`,`kjwl_p_recordschool`,`kjwl_p_experience`,`kjwl_p_resume`,`kjwl_p_event`,`kjwl_p_status`,`kjwl_p_datetime`) values 
(1,'789','426','123','[{\"scontent\":\"798\"},{\"scontent\":\"123\"}]','\"<p>123456897+fghtyuhjv</p>\"','\"<p>ftyvhjdty+7891</p>\"',1,'2021-08-23 11:07:33'),
(2,'毕业院校','所学专业','最高学历','[{\"scontent\":\"教育经历1\"},{\"scontent\":\"教育经历2\"},{\"scontent\":\"教育经历3\"}]','\"<p>这是简历</p>\"','\"<p>这是重要事件</p>\"',1,'2021-08-23 11:11:59'),
(3,'青鸟','机修','克里斯托大学','[{\"scontent\":\"太阳花幼儿园\"},{\"scontent\":\"克里斯托\"}]','\"<p>这是大老板的简介：没有写</p>\"','\"<p>这是大老板的重要事件：不知道，还没编</p>\"',1,'2021-08-23 14:28:16'),
(4,'南京天纵易康生物科技股份有限公司','医药','本科','[{\"scontent\":\"南京\"},{\"scontent\":\"南京市江北新区星火路10号\"}]','\"<p>透明质酸创面防护凝胶敷料</p>\"','\"<p>适用于浅表面创面、手术术后切口会哦创面、机械创伤、。。。等等</p>\"',1,'2021-08-23 16:27:15'),
(5,'789','132','798','[{\"scontent\":\"dfgs\"}]','\"<p>sthh</p>\"','\"<p>45456</p>\"',1,'2021-08-23 16:31:12'),
(6,'潮州市潮安区','食品','本科','[{\"scontent\":\"广东\"},{\"scontent\":\"潮州\"}]','\"<p>无糖薄荷糖</p>\"','\"<p>无糖型压片糖果</p>\"',1,'2021-08-23 16:34:38'),
(7,'潮州','食品','本科','[{\"scontent\":\"广东\"},{\"scontent\":\"潮州\"},{\"scontent\":\"\"}]','\"<p>无糖薄荷糖（假的）</p>\"','\"<p>无糖型压片糖果（这个也是假的）</p>\"',1,'2021-08-23 16:39:58'),
(8,'毕业院校测试(*)','所学专业测试(*)','最高学历测试(*)','[{\"scontent\":\"教育经历1测试\"},{\"scontent\":\"教育经历3测试\"}]','\"<p>这是简历测试(*)</p>\"','\"<p>这是重要事件测试(*)</p>\"',1,'2021-08-24 11:35:23'),
(9,'-','-','-','[]','-','-',1,'2021-08-25 11:08:49'),
(10,'-','-','-','[]','-','-',1,'2021-08-25 11:09:45'),
(11,'-','-','-','[]','-','-',1,'2021-08-25 11:11:29'),
(12,'-','-','-','[]','-','-',1,'2021-08-25 11:12:09'),
(13,'-','-','-','[{\"scontent\":\"-\"}]','-','-',1,'2021-08-25 11:13:05'),
(14,'-','-','-','[{\"scontent\":\"-\"}]','\"<p>-</p>\"','\"<p>-</p>\"',1,'2021-08-25 11:32:14'),
(15,'-','-','-','[{\"scontent\":\"-\"}]','\"<p>-</p>\"','\"<p>-</p>\"',1,'2021-08-25 11:27:33'),
(16,'-','-','-','[{\"scontent\":\"-\"}]','\"<p>联动测试</p>\"','\"<p>联动测试<br/></p>\"',1,'2021-08-26 11:25:15'),
(17,'-','-','-','[{\"scontent\":\"-\"}]','\"<p>联动测试2<br/></p>\"','\"<p>联动测试2<br/></p>\"',1,'2021-08-26 11:25:54'),
(18,'-','-','-','[{\"scontent\":\"-\"}]','\"-\"','\"-\"',1,'2021-08-27 11:01:07'),
(19,'-','-','-','[{\"scontent\":\"-\"}]','\"<p>-</p>\"','\"<p>-</p>\"',1,'2021-08-27 11:19:08'),
(20,'中国人民解放军战略支援部队信息工程大学','毛泽东思想和中国特色社会主义理论体系概论','研究生','[{\"scontent\":\"132456879564123564897451325468754623154687845213\"},{\"scontent\":\"45613254645665454546\"}]','\"<p>-</p>\"','\"<p>-</p>\"',1,'2021-08-27 16:43:16');

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_pc_user` */

insert  into `kjwl_pc_user`(`kjwl_u_id`,`kjwl_u_name`,`kjwl_u_account`,`kjwl_u_password`,`kjwl_u_portrait`,`kjwl_u_birthdate`,`kjwl_u_sex`,`kjwl_u_identity`,`kjwl_u_phone`,`kjwl_u_email`,`kjwl_u_status`,`kjel_u_datetime`) values 
(1,'小红',1234567890,'123456',NULL,'1999-04-14','女',1,'18978951265','456789123@qq.com',1,'2021-07-20 10:03:23'),
(2,'小明',1234567891,'987456',NULL,'1993-08-21','男',1,'15648975264','789456123@qq.com',0,'2021-07-20 10:03:51'),
(3,'小刚',1234567892,'011qaz',NULL,'1999-10-17','男',1,'13945678541','741852963@136.com',1,'2021-07-20 10:03:24'),
(4,'yiyi',1294784589,'123456','http://localhost:8000/upload_b26d973bfa8fcd58df7c47e84270d137.png','1995-11-24','男',2,'15504651107','1234784569@qq.com',1,'2021-08-30 16:30:59'),
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
(17,'无无',1234567905,'123456','http://localhost:8000/头像.png','2021-07-01','男',2,'14894652685','1654@ww.com',1,'2021-07-30 15:15:19'),
(18,'六六',1234567906,'123456','http://localhost:8000/头像.png','2021-08-25','女',1,'14846548955','123@qq.com',1,'2021-08-25 11:34:32'),
(19,'七七七',1234567907,'123456','http://localhost:8000/头像.png','2021-08-30','女',1,'15468974654','123@qqq.com',1,'2021-08-30 11:23:53');

/*Table structure for table `kjwl_yd_user` */

DROP TABLE IF EXISTS `kjwl_yd_user`;

CREATE TABLE `kjwl_yd_user` (
  `kjwl_yu_id` int(10) NOT NULL AUTO_INCREMENT,
  `kjwl_yu_portrait` varchar(100) DEFAULT NULL,
  `kjwl_yu_account` int(10) DEFAULT NULL,
  `kjwl_yu_name` varchar(20) DEFAULT NULL,
  `kjwl_yu_password` varchar(20) DEFAULT NULL,
  `kjwl_yu_privilege` int(2) DEFAULT '1',
  `kjwl_yu_privilegetime` datetime DEFAULT '0000-00-00 00:00:00',
  `kjwl_yu_phone` varchar(11) DEFAULT NULL,
  `kjwl_yu_email` varchar(30) DEFAULT NULL,
  `kjwl_yu_signature` varchar(100) DEFAULT NULL,
  `kjwl_yu_status` int(2) DEFAULT '1',
  `kjwl_yu_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`kjwl_yu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `kjwl_yd_user` */

insert  into `kjwl_yd_user`(`kjwl_yu_id`,`kjwl_yu_portrait`,`kjwl_yu_account`,`kjwl_yu_name`,`kjwl_yu_password`,`kjwl_yu_privilege`,`kjwl_yu_privilegetime`,`kjwl_yu_phone`,`kjwl_yu_email`,`kjwl_yu_signature`,`kjwl_yu_status`,`kjwl_yu_datetime`) values 
(1,'http://localhost:8000/头像.png',1234657890,'用户1','123456',1,'0000-00-00 00:00:00','12345678900','123@qq.com','这是用户1',1,'2021-08-30 11:03:48'),
(2,'http://localhost:8000/头像.png',1234567891,'用户2','1234567',1,'2021-08-30 00:00:00','12345678901','234@qq.com','这是用户2',1,'2021-08-30 11:12:04'),
(3,'http://localhost:8000/头像.png',1234567982,'用户3','12345678',1,'0000-00-00 00:00:00','12345678902','345@qq.com','这是用户3',1,'2021-08-27 17:29:20'),
(4,'http://localhost:8000/头像.png',1234567893,'用户4','123456789',1,'0000-00-00 00:00:00','12345678903','456@qq.com','这是用户4',1,'2021-08-27 17:29:20'),
(5,'http://localhost:8000/头像.png',1234567894,'用户5','123456',2,'2021-09-27 00:00:00','12346579804','567@qq.com','这是用户5',1,'2021-08-27 17:31:08'),
(6,'http://localhost:8000/头像.png',1234657985,'用户6','132456',1,'0000-00-00 00:00:00','12345678905','678@qq,com','这是用户6',1,'2021-08-27 17:29:19'),
(7,'http://localhost:8000/头像.png',1234567896,'用户7','123456',1,'0000-00-00 00:00:00','13246578906','789@qq.com','这是用户7',1,'2021-08-27 17:29:19'),
(8,'http://localhost:8000/头像.png',1234567897,'用户8','123465',2,'2021-09-01 15:13:14','12345678907','891@qq.com','这是用户8',1,'2021-08-27 17:32:15'),
(9,'http://localhost:8000/头像.png',1234657898,'用户9','1234678',1,'0000-00-00 00:00:00','12345678908','912@qq.com','这是用户9',1,'2021-08-27 17:29:18'),
(10,'http://localhost:8000/头像.png',1234567899,'用户10','123456',1,'0000-00-00 00:00:00','12346578909','1231@qq.com','这是用户10',1,'2021-08-27 17:29:16');

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

/*Table structure for table `test_editor` */

DROP TABLE IF EXISTS `test_editor`;

CREATE TABLE `test_editor` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `content` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `test_editor` */

insert  into `test_editor`(`id`,`content`) values 
(2,'\"<p>用 JS 设置的内容</p><p>456+gib</p>\"'),
(3,'\"<p>用 JS 设置的内容2134546513</p>\"'),
(4,'\"<p>这是设置的内容</p>\"'),
(5,'\"<p>4657892315</p>\"'),
(6,'\"<p>当地时间8月19日，阿富汗塔利班发言人扎比胡拉·穆贾希德在社交网站发表声明，在阿富汗脱离英国统治、独立102周年纪念日之际，<a href=\\\"https://s.weibo.com/weibo?q=%23%E5%A1%94%E5%88%A9%E7%8F%AD%E5%AE%A3%E5%B8%83%E6%88%90%E7%AB%8B%E9%98%BF%E5%AF%8C%E6%B1%97%E4%BC%8A%E6%96%AF%E5%85%B0%E9%85%8B%E9%95%BF%E5%9B%BD%23\\\" target=\\\"_blank\\\">#塔利班宣布成立阿富汗伊斯兰酋长国#</a>。<br/><br/>当地时间8月17日，接管首都喀布尔的第三天，阿富汗塔利班举行了首场新闻发布会。塔利班发言人扎比胡拉·穆贾希德表示：“在解放全国后，我们对任何人都没有敌视政策，我们大赦所有组织的反对者，因为我们不再想要战争。”<br/><br/>在这场备受瞩目的发布会上，穆贾希德回应了众多阿富汗民众和国际社会关注的问题，并作出了一系列承诺，包括保障女性权益、建立包容性政府、不对其他国家构成威胁等。他表示，“阿富汗是一个穆斯林国家，不管是20年前还是现在”，但考虑到一路走来的经验，“我们和20年前相比有了巨大的变化”。<br/><br/>塔利班入主喀布尔后，将打造一个怎样的政权？对于饱受战争苦难的阿富汗人民，迎来的将是怎样的命运？南方+记者连线多位专家进行解读。<br/><br/><img src=\\\"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_org.png\\\" alt=\\\"[星星]\\\"/>建立包容性政府？仍存不确定性<br/>在塔利班宣布胜利之际，许多阿富汗人想方设法逃离这个国家。据央视新闻报道，目前喀布尔街头商店行人稀少，大部分民众倾向于待在家中，街上到处是塔利班设立的检查站并主动去询问民众的担忧。而喀布尔机场的情况仍然混乱，众多阿富汗民众和外国人争相逃离阿富汗。<br/><br/>阿富汗民众的恐慌来源于20年前。<br/><br/>1996年9月，塔利班攻占喀布尔，宣布成立“阿富汗伊斯兰酋长国”，在阿富汗实行了严酷统治，人们生活的方方面面充满禁忌：妇女被重重纱布包裹，只准露出两只眼睛，不得参加任何社会活动或受教育；男人不得剃胡子或留“美国式”发型；旅馆、饭店除宗教歌曲外，其他音乐一律不得播放……<br/><br/>20年后重掌政权，塔利班迫切想证明自己的改变。塔利班发言人沙欣曾表示，塔利班将组建一个“包容性的阿富汗政府”。穆贾希德在谈到组建政府的问题时也表示，塔利班将“组建一个有各方参与的‘伊斯兰政府’”，对于法律等问题的制定则需要等新政府成立后再具体商榷。<br/><br/>对于这一承诺，兰州大学阿富汗研究中心主任朱永彪教授表示，其实现的可能性是很大的。实际上，建立包容性政府不仅是塔利班的诉求，也是其他政治派别的共同诉求，同时也是国际社会对阿富汗新政府的希望，但是这种包容性具体能够执行到什么程度仍存较大不确定性。<br/><br/>“需要注意的是，塔利班所谓的包容性政府，前提是以遵循伊斯兰教法为基础的。”西北大学中东研究所副教授王晋提醒，在传统伊斯兰政治理念里，伊斯兰本身具有包容性，但这种包容性和现代政治制度倡导的民主、开放、男女平等等包容性理念并不相同，是遵循伊斯兰教法的基础上实施的一种社会治理。<br/><br/><img src=\\\"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_org.png\\\" alt=\\\"[星星]\\\"/>允许女性工作和学习？在伊斯兰范围内<br/>一直以来，阿富汗的妇女权益问题备受关注。自1996年塔利班占领喀布尔并掌权的5年间，阿富汗妇女在法律上被拒之于学校大门之外，无法外出工作，全身需要罩在连帽长袍中……<br/><br/>因此，20年后，塔利班再次进入喀布尔，许多阿富汗女性表达了对未来的担忧。对此，塔利班正试图将自身塑造成更加温和的形象，穆贾希德称，未来将允许女性在新的框架下工作和学习。<br/><br/>据环球网报道，塔利班在首场记者会承诺：“妇女将享有一切权利，无论是在工作还是其他活动中，我们保证妇女在伊斯兰范围内的所有权利。”塔利班表示已经准备好“为妇女提供工作和学习的环境”，但对于实际操作中如何保障女性权利，穆贾希德并未做出解释。<br/><br/>塔利班能否兑现这个承诺？或者只是塔利班掌权的权衡之计？<br/><br/>在朱永彪教授看来，在保障妇女权利上，塔利班确实表现出比以往更进步的态度，但其核心没有改变。因此，保障妇女权利具体能履行到什么程度，是否会出现反复和反弹，仍然具有很大的不确定性。<br/><br/>王晋表示，与20年前相比，塔利班主动提出允许妇女工作和学习，这是一个好的开始。但未来是否能真正推行，地方的军政领袖在实践中能否遵循等都存在问题。另外一个层面，塔利班所强调的学习，是指现代化知识还是学习宗教规则和知识、允许妇女参加的工作定义是什么，也需要进一步观察。<br/><br/>王晋解释，在一些相对保守的国家，女性也可以工作和学习，但是工作和学习限定在某些特定领域，并不是像外界所理解或期待的女性可以自由工作、自由学习。“我认为，塔利班在妇女问题上进步的幅度是在一定范围的。”<br/><br/><img src=\\\"https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_org.png\\\" alt=\\\"[星星]\\\"/>守江山难：未来仍需获得国际和民众认可<br/><br/>“打江山易，守江山难”。对于长期处于战乱局面的阿富汗来说，塔利班能否坐稳江山，带领阿富汗人民走向和平与发展，仍面临不少威胁，其中，如何获得国际和其他国家对其政权的认可，是塔利班掌权必须面临的问题。<br/><br/>阿富汗是否还会成为恐怖主义滋生的温床，进而威胁到其他国家的安全？事实上，塔利班基本控制阿富汗全国后，各国政府人士以及国际社会对阿富汗未来的发展表示担忧。<br/><br/>据央视网报道，穆贾希德表示：“我们向包括美国在内的全世界做出保证，阿富汗绝对不会对包括地区邻国在内的其他国家构成威胁，我们保证绝不允许任何势力利用阿富汗领土做危害邻国等其他任何国家的事情。”<br/><br/>在朱永彪教授看来，塔利班主导组建的新政府能否获得其他国家的认可，还要看其所承诺的组建包容性政府、妇女权利保障、与恐怖主义的联系、禁止毒品生产等承诺是否能够兑现以及兑现的程度。<br/><br/>王晋则认为，总体上看，阿富汗塔利班展现出一个比较积极的状态，他们希望和外界接触，但这种接触必然会带来很多困难，其奉行伊斯兰经典政治理念并以此指导其政治实践，与西方国家一贯强调的人权、民主、妇女保护、少数民族保护等理念存在根本上的分歧，未来双方的冲突难以避免。<br/><br/>对于阿富汗国内，塔利班主导组建的新政府如何调和国内的矛盾，赢得民众信任、获得民众认同，也是不可回避的一大难题。<br/><br/>朱永彪认为，塔利班要想获得民众认同，首先需要改良自己、去“极端化”；其次是要‍‍保障民生，发展经济，提供更多工作岗位；还需要发展公益性事业，提供一个更安全的社会发展环境。<br/><br/>王晋则认为，阿富汗无论哪方掌权，都是阿富汗民众的意愿和民心所决定的，是阿富汗人民的选择，国际社会也都尊重这样的选择。阿富汗塔利班未来会面临很多挑战，但相信其能够把这些挑战都处理好。<br/></p>\"');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
