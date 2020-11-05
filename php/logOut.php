<?php
//初始化session
session_start();
//删除session变量
unset($_SESSION['name']);
//彻底销毁session
session_destroy();
