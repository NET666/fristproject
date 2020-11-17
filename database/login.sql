/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50549
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2020-11-17 16:49:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `register_time` datetime NOT NULL,
  `super_admin` varchar(10) NOT NULL DEFAULT '0' COMMENT '如果为1：则为管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('1', '张三', 'e10adc3949ba59abbe56e057f20f883e', '2020-11-16 18:21:16', '1');
INSERT INTO `login` VALUES ('2', '123', 'e10adc3949ba59abbe56e057f20f883e', '2020-11-16 23:19:49', '0');
INSERT INTO `login` VALUES ('3', '陈绪运', 'e10adc3949ba59abbe56e057f20f883e', '2020-11-16 23:22:02', '1');
