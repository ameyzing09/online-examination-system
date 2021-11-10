CREATE DATABASE IF NOT EXISTS onlineexaminationsystem;

CREATE TABLE IF NOT EXISTS `class` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_std` varchar(45) NOT NULL,
  `class_div` varchar(45) NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE IF NOT EXISTS `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int NOT NULL,
  `student_fname` varchar(45) NOT NULL,
  `student_mname` varchar(45) NOT NULL,
  `student_lname` varchar(45) NOT NULL,
  PRIMARY KEY (`student_id`),
  KEY `c_id_idx` (`c_id`),
  CONSTRAINT `c_id` FOREIGN KEY (`c_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(45) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE IF NOT EXISTS `teach_sub_class` (
  `tsd_id` int NOT NULL AUTO_INCREMENT,
  `tsd_teacher_id` int NOT NULL,
  `tsd_subject_id` int NOT NULL,
  `tsd_class_id` int NOT NULL,
  PRIMARY KEY (`tsd_id`),
  KEY `tsd_teacher_id_idx` (`tsd_teacher_id`),
  KEY `tsd_subject_id_idx` (`tsd_subject_id`),
  KEY `tsd_class_id_idx` (`tsd_class_id`),
  CONSTRAINT `tsd_class_id` FOREIGN KEY (`tsd_class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tsd_subject_id` FOREIGN KEY (`tsd_subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tsd_teacher_id` FOREIGN KEY (`tsd_teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE IF NOT EXISTS `teacher` (
  `teacher_id` int NOT NULL AUTO_INCREMENT,
  `teacher_user_name` varchar(45) NOT NULL,
  `teacher_password` varchar(45) NOT NULL,
  `teacher_name` varchar(45) NOT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

