/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50549
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2020-11-17 16:49:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for aboutme
-- ----------------------------
DROP TABLE IF EXISTS `aboutme`;
CREATE TABLE `aboutme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `rq` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aboutme
-- ----------------------------
INSERT INTO `aboutme` VALUES ('3', '2020-10-19', '&nbsp;&nbsp;&nbsp;&nbsp;今天是我毕设之路，开始的第一天。2020-10-19号晚上20点，开始对<u>豆瓣网</u>分析，通过浏览器提供的抓包功能,发现豆瓣网视频，数据基本都是以JSON格式返回给前端，根据我之前所学的<u>Ajax(阿贾克斯)</u>，可以判定这个网站的请求方式是用Ajax发送请求。打开控制台可发现，请求接口为<a>https://movie.douban.com/j/search_subjects</a>，提交参数有四个，分别为：<br/>\ntype: tv    &nbsp;&nbsp;tv表示电视剧类型，type有两个类型分别为：tv、movie，如果为movie，则返回电影类型数据<br/>\ntag: 热门   &nbsp; &nbsp;tag表示视频类型，根据用户操作选择，返回相应数据，比如：选中<u>韩剧</u>，则返回韩剧相关视频<br/>\npage_limit: 50  &nbsp; &nbsp;page_limit:表示返回视频数量，这里表示返回50条视频数据<br/>\npage_start: 0 &nbsp;&nbsp;page_start:表示从第几条数据获取,如果一次取50条数据，第一页page_start=0，第二页，page_start=50，第三页page_start=100，依次类推<br/>\n分析完数据后，开始编写<u>index.html</u>界面。', '2020-10-29 01:22:00');
INSERT INTO `aboutme` VALUES ('4', '2020-10-20', '&nbsp;&nbsp;&nbsp;&nbsp;今天继续编写index.html界面，以及php后台的编写，经过一天的辛苦，终于把index页面完成。并且实现了该页面的数据采集，并成功渲染到页面上。<br/><br/>\n本次使用到的技术有：Ajax、html+css、php、vue.js。前端通过Ajax发送请求，把相关数据发送到backJson.php后台，backJson.php拿到对应的数据后，进行拼接，形成一个URl地址后，使用file_get_contents()方法对接口进行访问，并获得豆瓣网对应的数据后，返回给前端，前端使用之前声明好的数据接收数据，然后使用vue.js把对应的数据渲染到对应的HTML标签上。', '2020-10-29 00:41:19');
INSERT INTO `aboutme` VALUES ('5', '2020-10-21', '&nbsp;&nbsp;&nbsp;&nbsp;今天进行注册、登录、评论功能、视频详情的实现。使用到的技术有：Ajax、html+css、php、vue.js、MySQL数据库。<br/><br/>\n今天学了一个新知识：jquery-cookie，用于把变量保存到cookie中，方便其他页面调用，该作用于视频详情页面，当用户点击详情的时候，把视频id，视频封面图片地址，保存到cookie，并跳转到details.html视频详情页面后，并把刚保存的id，连接取出来，并把id提交到后台，进行地址拼接访问，获得详情数据，进行对页面的渲染。', '2020-10-29 00:59:31');
INSERT INTO `aboutme` VALUES ('6', '2020-10-22', '&nbsp;&nbsp;&nbsp;&nbsp;今天对页面布局，进行调整，以及对前端CSC样式进行了学习。<br/><br/>\n在设计界面的时候，发现自己的CSS基础不够扎实，于是去B站学习了一下，通过本次对CSS学习,对CSS有了更好的掌握，为后面设计界面打下更好的基础。', '2020-10-29 01:16:41');
INSERT INTO `aboutme` VALUES ('7', '2020-10-23', '&nbsp;&nbsp;&nbsp;&nbsp;今天开始实现，首页顶部轮番图数据的获取，经过对豆瓣网分析，发现改网站首页，顶部<i>正在热映</i>区域，陈列着10多个影视作品，经分析发现，这货居然和下边视频作品返回的不一样，他是直接打印到页面的，使用浏览器，查看源码功能，直接就能看到这10多个作品的信息，有规律的分布在对应的HTML标签中。<br/><br/>\n像这种直接在html标签中能看到的，使用<i>爬虫</i>技术，爬取对应类名标签里面的内容即可，这里，我使用了PHPQuery库,这个库是PHP官方提供的，专为于爬虫而生的库，这货语法和JQuery语法基本相同，学过JQuery的可以很快上手，还好，之前学了一点点点JQUery，加上配合查看官方手册，成功利用PHPQuery库，爬取豆瓣网首页正在热映的视频，完成轮番功能。\n', '2020-10-29 09:59:06');
INSERT INTO `aboutme` VALUES ('8', '2020-10-26', '&nbsp;&nbsp;&nbsp;&nbsp;今天实现获取豆瓣网视频评论信息，打开豆瓣网，点击视频查看评论,发现首页评论地址栏URL为如下：<br/>\nhttps://movie.douban.com/subject/3346423/comments?status=P。<br/>当我点击下一页后，地址栏URL变为：<br/>https://movie.douban.com/subject/3346423/comments？start=20&limit=20&status=P&sort=new_score<br/>\n通过对比发现，当我点击下一页的时候start参数将以20进行累加，当我点击上一页的时，start就减去20，链接中的3346423是该视频的ID号，limit=20表示每页返回20条评论数据，而且当前每一页都是二十条评论，如果没猜错，页面会跟着这个参数，定返回评论数量，于是我修改了一下limit参数，进行提交，不管大于20还是小于20，页面返回的还是20条数据，居然跟我猜测的不一样，估计豆瓣网在后台进行了判断，一页只能返回20条，我***，不管了，反正这个参数，不影响我对评论数据的爬取，嘿嘿，而status、sort参数始终没变，所以不用管。<br/><br/>\n这个评论接口只会改变两个参数，第一就是ID，每个视频对于不一样的ID，而start则控制从数据库，那行开始获取数据，从而实现分页，知道了这些规则，下一步开始实现，实现方法跟2020-10-23号获取首页正在热映的差不多一样的方法，只不过，这里多了两个参数。一个是视频ID号，一个是控制分页。', '2020-10-29 10:55:10');
INSERT INTO `aboutme` VALUES ('9', '2020-10-27', '&nbsp;&nbsp;&nbsp;&nbsp;今天开始，选影页面的制作以及功能的实现，经分析发现，其参数相对复杂，虽然请求的参数相对于之前的多，也比之前的复杂，但是请求方式跟之前的类似，可谓“万变不离其宗，换汤不换药”，继续肝，完事。', '2020-10-29 11:14:37');
INSERT INTO `aboutme` VALUES ('10', '2020-10-28', '&nbsp;&nbsp;&nbsp;&nbsp;继续昨天未完成的‘选影(choose.html)功能页面编写’。', '2020-10-29 11:30:13');
INSERT INTO `aboutme` VALUES ('11', '2020-10-29', '&nbsp;&nbsp;&nbsp;&nbsp;今天完成‘aboutMe.html’页面的编写，以及功能的实现，这个页面也就是当前看到的这个页面，用于记录“我的毕设日志”，使用到的技术有：HTML5+CSS，PHP，MYSQL，VUE.JS,AXIOS(AJAX的封装，网络请求库)。', '2020-10-29 11:36:11');
INSERT INTO `aboutme` VALUES ('12', '2020-10-30', '&nbsp;&nbsp;&nbsp;&nbsp;看代码,测试，找BUG，把页面部署到我在阿里云租的服务器上，使用链接进行远程访问。网址如下：<br/>\n<a target=\"_blank\" href=\"http://www.52luntan.xyz/myPractice/vue/\">http://www.52luntan.xyz/myPractice/vue/<a/>', '2020-10-30 15:29:40');
INSERT INTO `aboutme` VALUES ('13', '2020-10-30', '&nbsp;&nbsp;&nbsp;&nbsp;建立sitedata数据库，用来存储网站视频数据，目前该表以保存视频数据达<storong style=\"color:yellow\">7818</storong>条', '2020-10-31 00:24:37');
