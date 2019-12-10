-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 10, 2019 at 02:56 PM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scrumhelper`
--
CREATE DATABASE IF NOT EXISTS `scrumhelper` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `scrumhelper`;

-- --------------------------------------------------------

--
-- Table structure for table `assigned_task`
--

CREATE TABLE `assigned_task` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assigned_task`
--

INSERT INTO `assigned_task` (`id`, `task_id`, `username`) VALUES
(7, 1, 'user1'),
(16, 15, 'user1'),
(19, 17, 'user1'),
(20, 17, 'User6'),
(21, 18, 'user1'),
(22, 18, 'User6'),
(28, 22, 'UserRayan'),
(41, 28, 'user1'),
(42, 28, 'jimmy'),
(50, 40, 'user1'),
(80, 52, 'coucou'),
(83, 24, 'user1'),
(84, 51, 'coucou'),
(110, 60, 'coucou'),
(111, 62, 'coucou'),
(112, 59, 'User6'),
(113, 57, 'User6'),
(114, 57, 'User5'),
(115, 57, 'User5'),
(117, 64, 'Test'),
(122, 63, 'user1'),
(123, 63, 'Test'),
(133, 72, 'user1'),
(156, 103, 'User5'),
(157, 16, 'User5'),
(158, 16, 'User5'),
(177, 113, 'User5'),
(179, 114, 'User5'),
(180, 115, 'User5'),
(183, 12, 'User5'),
(184, 12, 'User5'),
(195, 130, 'User5'),
(196, 130, 'coucou'),
(197, 131, 'coucou'),
(200, 138, 'rrkheloufi'),
(201, 139, 'rrkheloufi'),
(202, 140, 'User5'),
(203, 141, 'User5'),
(204, 142, 'User5'),
(205, 143, 'User5'),
(206, 144, 'User5'),
(207, 145, 'User5'),
(208, 146, 'User5'),
(209, 147, 'rrkheloufi'),
(210, 148, 'rrkheloufi');

-- --------------------------------------------------------

--
-- Table structure for table `documentation_of_release`
--

CREATE TABLE `documentation_of_release` (
  `id` int(11) NOT NULL,
  `url` text COLLATE utf8_unicode_ci NOT NULL,
  `release_id` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `documentation_of_release`
--

INSERT INTO `documentation_of_release` (`id`, `url`, `release_id`) VALUES
(1, 'https://www.pokebip.com/index.php?phppage=membres/index', '21706864'),
(2, 'https://www.youtube.com/ikujhlhlhlhje', '21773215');

-- --------------------------------------------------------

--
-- Table structure for table `issue`
--

CREATE TABLE `issue` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `priority` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `difficulty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `issue`
--

INSERT INTO `issue` (`id`, `project_id`, `name`, `description`, `priority`, `difficulty`) VALUES
(3, 2, 'New Issue 1', 'Descfgsdfh', 'MEDIUM', 1),
(4, 2, 'Issue numéro 2', 'Cette description concerne lissue 2', 'Medium', 7),
(11, 8, 'Issue NOW', 'DESCRIPTION', 'HIGH', 16),
(113, 121, 'jimissue1', 'sltmdr', 'haute', 5),
(114, 121, 'jimissue2', 'mdrslt', 'basse', 7),
(121, 3, 'Issue', 'frfr', 'LOW', 10),
(122, 3, 'Une autre issue', 'LALALALALALLAA', 'LOW', 5),
(125, 3, 'Issue Encore meilleure', 'LALALALALALLAA', 'MEDIUM', 10),
(126, 3, 'frf', 'Une bonne description', 'LOW', 2),
(127, 110, 'jkbhjv2', 'nghfb', 'LOW', 1),
(135, 110, 'gbdvfc', 'vfsd', 'HIGH', 1),
(153, 3, 'rdfrdf', 'Hola', 'HIGH', 10),
(157, 8, 'I1', 'Test', 'LOW', 1),
(158, 8, 'I2', 'Test2', 'HIGH', 0),
(159, 8, 'I3', 'Test3', 'MEDIUM', 6),
(163, 148, 'I1', 'As a member I want to create a new project In order to work on it', 'LOW', 4),
(165, 148, 'I3', 'As a member of a project I want to create a new issue In order to see it in the list of issue', 'HIGH', 13),
(420, 506, 'Issue Test', 'A test description', 'HIGH', 15),
(421, 506, 'Name', 'Description !:;,n', 'HIGH', 15),
(424, 508, 'Issue Test', 'A test description', 'HIGH', 15),
(425, 508, 'Name', 'Description !:;,n', 'HIGH', 15),
(428, 510, 'Issue Test', 'A test description', 'HIGH', 15),
(429, 510, 'Name', 'Description !:;,n', 'HIGH', 15),
(432, 512, 'Issue Test', 'A test description', 'HIGH', 15),
(433, 512, 'Name', 'Description !:;,n', 'HIGH', 15),
(434, 513, 'Issue Test', 'A test description', 'HIGH', 15),
(435, 513, 'Name', 'Description !:;,n', 'HIGH', 15),
(436, 514, 'Issue Test', 'A test description', 'HIGH', 15),
(437, 514, 'Name', 'Description !:;,n', 'HIGH', 15),
(438, 515, 'Issue Test', 'A test description', 'HIGH', 15),
(439, 515, 'Name', 'Description !:;,n', 'HIGH', 15),
(440, 516, 'Issue Test', 'A test description', 'HIGH', 15),
(441, 516, 'Name', 'Description !:;,n', 'HIGH', 15),
(442, 517, 'Issue Test', 'A test description', 'HIGH', 15),
(443, 517, 'Name', 'Description !:;,n', 'HIGH', 15),
(444, 518, 'Issue Test', 'A test description', 'HIGH', 15),
(445, 518, 'Name', 'Description !:;,n', 'HIGH', 15),
(446, 519, 'Issue Test', 'A test description', 'HIGH', 15),
(447, 519, 'Name', 'Description !:;,n', 'HIGH', 15),
(448, 520, 'Issue Test', 'A test description', 'HIGH', 15),
(449, 520, 'Name', 'Description !:;,n', 'HIGH', 15),
(450, 521, 'Issue Test', 'A test description', 'HIGH', 15),
(451, 521, 'Name', 'Description !:;,n', 'HIGH', 15),
(502, 573, 'I2', 'As i1 I want to... In order to...', 'MEDIUM', 1),
(504, 573, 'I1', 'As... I want to... In order to...', 'LOW', 1),
(505, 573, 'I2', 'As... I want to... In order to...', 'MEDIUM', 1),
(506, 573, 'I1', 'As... I want to... In order to...', 'LOW', 1),
(507, 573, 'I2', 'As... I want to... In order to...', 'LOW', 1),
(526, 586, 'test', 'As... I want to... In order to...', 'LOW', 5),
(527, 472, 'test', 'As... I want to... In order to...', 'LOW', 5),
(542, 123, 'I1', 'As a developper I want to... In order to...', 'LOW', 14),
(543, 121, 'jimissue3', 'As... I want to... In order to...', 'MEDIUM', 5),
(544, 599, 'Création d\'un compte	', 'En tant que visiteur, je souhaite créer un compte sur le site en cliquant sur un bouton \"Inscription\" afin de pouvoir m\'inscrire dans la base de donnée et me connecter par la suite. La page de création d\'un compte doit me demander : un nom d\'utilisateur unique sous forme de chaîne de caractères (20 char max) un mot de passe sous forme de chaîne de caractères.', 'LOW', 13),
(546, 599, 'Connexion/Déconnexion	', 'En tant que visiteur, je souhaite me connecter à mon compte en cliquant sur un bouton \"Connection\" afin d\'avoir accès à mes projets et me déconnecter en cliquant sur un bouton \"Déconnexion\". La page de connexion doit me demander : mon nom d\'utilisateur unique sous forme de chaîne de caractères. un mot de passe sous forme de chaîne de caractères. Un message d\'erreur doit apparaître si le couple nom d\'utilisateur/mot de passe entré ne correspond à aucun compte.', 'LOW', 8),
(547, 599, 'Création de projet	', 'En tant que connecté, je souhaite pouvoir créer un projet afin qu\'il soit disponible dans ma liste de projets en spécifiant : un nom, une description, et en ajoutant des membres', 'HIGH', 5),
(548, 599, 'Liste des projets d\'un membre', 'En tant que connecté, je souhaite avoir accès à une liste des projets auxquels je suis inscrit afin de pouvoir accéder/modifier leur contenu. Je n\'ai accès qu\'aux projets auxquels j\'ai été invité.', 'LOW', 5),
(549, 599, 'Liste des issues d\'un projet/sprint	', '	En tant que membre d\'un projet, je souhaite pouvoir accéder à la liste des issues d\'un projet, et la liste des issues d\'un sprint sélectionné afin de voir l\'avancement du projet/sprint et de pouvoir ajouter, modifier ou supprimer des issues du projet/sprint.', 'HIGH', 5),
(550, 599, '	Création/Modification/Suppression d\'Issues', 'En tant que membre d\'un projet et en étant sur la liste des issues d\'un projet, je souhaite pouvoir créer une Issue en cliquant sur \"Ajouter Issue\" qui ouvre un formulaire me permettant de spécifier : un nom une description une priorité une difficulté (l\'id sera créé automatiquement) Modifier une issue en cliquant sur \"Modifier\" à coté de l\'issue concernée, et de spécifier les nouvelles valeurs des champs, et supprimer une issue en cliquant sur le bouton \"Supprimer\" à coté de l\'issue à supprimer, puis en confirmant mon choix afin de permettre aux autres membres du projet de la voir et l\'ajouter à un sprint pour pouvoir la découper en tâches.', 'HIGH', 5),
(551, 599, 'Liste des tâches	', 'En tant que membre d\'un projet, je souhaite pouvoir accéder à la liste des taches d\'un projet auxquel j\'ai été invité sous forme de tableau avec les tâches à faire les tâches en cours les tâches terminées. afin de connaître l\'avancement des tâche du projet que j\'ai séléctionné.', 'HIGH', 5),
(552, 599, 'Créer/Modifier/Supprimer une tâche', 'En tant que membre d\'un projet et étant sur la liste des tâches de celui-ci, je souhaite pouvoir créer une nouvelle tâche en cliquant sur le bouton \"Ajouter Tâche\" puis en spécifiant : son nom sa description son état sa date de début le temps nécessaire à sa réalisation sa Definition of Done les membres concernées par celle-ci la/les liaison(s) à l\'Id d\'une ou plusieurs issues. les tâches pré-requises à la réalisation de cette tâche Modifier les détails de la tâche, puis confirmer les changements cliquant sur le bouton \"Enregistrer\", et supprimer une tâche cliquant sur le bouton \"Supprimer\", puis en confirmant mon choix afin de permettre aux autres membres du projet de la voir et pouvoir l\'implémenter.', 'HIGH', 8),
(553, 599, 'Voir l\'issue liée à une tâche	', '	En tant que membre du projet, je souhaite pouvoir accéder à une Issue liée à une tâche afin d\' avoir accès facilement à celle-ci en cliquant sur son Id dans les détails de la tâche concernée.', 'HIGH', 3),
(557, 599, 'Menu de navigation dans un projet', ' projet	En tant que membre du projet, je souhaite avoir accès à un menu de navigation me permettant d\'accéder facilement à : la liste des issues la liste des tâches la liste des sprints la liste des releases la liste des documentations la liste des tests du projet afin de pouvoir accéder facilement à chaque partie du projet.', 'LOW', 3),
(558, 599, 'Invitation/Suppression de membres', 'En tant que créateur du projet, je souhaite pouvoir inviter d\'autres membres à mon projet lors de sa création, ou ultérieurement afin qu\'ils puissent avoir acces à celui-ci et participer à son avancement, en : cliquant sur un bouton \"Ajouter un membre\" spécifiant son nom d\'utilisateur et supprimer un membre de mon projet en cliquant sur un bouton \"Supprimer\" à coté du nom du membre à supprimer. Après sa suppression, un membre n\'a plus accès à la vue du projet.', 'LOW', 5),
(559, 599, 'Liste/Ajouter/Modifier/Supprimer Tests', 'En tant que membre du projet, je souhaite pouvoir ajouter un tests dans la liste des tests à effectuer en appuyant sur un bouton \"Ajouter Test\", puis en spécifiant un nom une description de la fonction à tester et du résultat attendu par celui-ci en le liant à une issue. en précisant la dernière version pour laquelle le test a été validé modifier un test en cliquant sur un bouton \"Modifier Test\" et supprimer un test en cliquant sur le bouton \"Supprimer\" à coté du test correspondant afin de pouvoir gérer facilement l\'avancement des tests du projet auxquel j\'appartient.', 'LOW', 5),
(560, 599, 'Modifier l\'état d\'un Test	', 'En tant que membre du projet, je souhaite pouvoir modifier l\'état d\'un test (\"A coder\" ou \"Fait\") afin de comprendre rapidement quels tests ont été faits, et ceux restant à coder dans l\'application.', 'LOW', 8),
(561, 599, 'Code couleur Tests	', 'En tant que membre du projet je souhaite que les tests bénéficient d\'un code couleur concernant leur état afin de faciliter la vue globale', 'LOW', 2);

-- --------------------------------------------------------

--
-- Table structure for table `issue_of_sprint`
--

CREATE TABLE `issue_of_sprint` (
  `id` int(11) NOT NULL,
  `sprint_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `issue_of_sprint`
--

INSERT INTO `issue_of_sprint` (`id`, `sprint_id`, `issue_id`) VALUES
(9, 5, 121),
(10, 5, 125),
(21, 4, 121),
(22, 4, 122),
(42, 7, 125),
(44, 9, 127),
(45, 9, 135),
(46, 10, 127),
(47, 10, 135),
(54, 12, 127),
(55, 12, 135),
(69, 15, 127),
(70, 15, 135),
(79, 20, 127),
(80, 20, 135),
(82, 24, 127),
(83, 24, 135),
(86, 26, 127),
(87, 26, 135),
(93, 8, 121),
(94, 8, 122),
(95, 8, 125),
(96, 8, 126),
(209, 31, 135),
(396, 180, 11),
(422, 274, 502),
(423, 274, 504),
(424, 276, 502),
(425, 276, 504),
(426, 277, 502),
(427, 277, 504),
(428, 38, 157),
(429, 38, 158),
(457, 298, 113),
(458, 298, 114),
(477, 299, 544),
(478, 299, 546),
(479, 299, 547),
(480, 299, 548),
(481, 299, 549),
(482, 299, 550),
(483, 299, 551),
(484, 299, 552),
(485, 299, 553),
(486, 300, 557),
(487, 300, 558),
(488, 300, 559),
(489, 300, 560),
(490, 300, 561);

-- --------------------------------------------------------

--
-- Table structure for table `issue_of_task`
--

CREATE TABLE `issue_of_task` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `issue_of_task`
--

INSERT INTO `issue_of_task` (`id`, `task_id`, `issue_id`) VALUES
(16, 28, 3),
(17, 28, 4),
(27, 38, 4),
(28, 40, 4),
(56, 24, 3),
(57, 51, 127),
(58, 51, 135),
(121, 62, 127),
(122, 62, 135),
(123, 59, 125),
(124, 59, 126),
(125, 59, 153),
(126, 57, 122),
(127, 57, 125),
(129, 64, 163),
(130, 64, 165),
(134, 63, 163),
(135, 63, 165),
(151, 1, 3),
(152, 76, 429),
(153, 78, 433),
(154, 80, 435),
(155, 82, 437),
(156, 84, 439),
(157, 86, 441),
(158, 88, 443),
(159, 90, 445),
(160, 92, 447),
(161, 94, 449),
(162, 96, 451),
(173, 10, 11),
(174, 10, 157),
(175, 14, 11),
(176, 14, 157),
(177, 15, 158),
(178, 15, 159),
(181, 11, 11),
(182, 11, 157),
(185, 16, 157),
(186, 16, 158),
(187, 17, 157),
(188, 17, 158),
(189, 18, 157),
(190, 18, 158),
(191, 19, 158),
(192, 19, 159),
(220, 114, 157),
(221, 115, 11),
(223, 12, 157),
(230, 130, 127),
(231, 130, 135),
(232, 131, 542),
(233, 132, 113),
(234, 132, 114),
(235, 133, 113),
(236, 134, 114),
(237, 135, 113),
(238, 136, 113),
(239, 136, 114),
(240, 137, 543),
(247, 138, 544),
(248, 138, 546),
(249, 138, 547),
(250, 139, 544),
(251, 139, 546),
(252, 139, 547),
(253, 140, 544),
(254, 140, 546),
(255, 140, 547),
(256, 141, 544),
(257, 141, 546),
(258, 141, 547),
(259, 142, 548),
(260, 143, 551),
(261, 144, 551),
(262, 144, 552),
(263, 145, 551),
(264, 145, 552),
(265, 146, 552),
(266, 147, 552),
(267, 148, 553);

-- --------------------------------------------------------

--
-- Table structure for table `issue_of_test`
--

CREATE TABLE `issue_of_test` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `issue_of_test`
--

INSERT INTO `issue_of_test` (`id`, `test_id`, `issue_id`) VALUES
(1, 4, 127),
(2, 4, 135),
(16, 11, 125),
(21, 9, 127),
(22, 9, 135),
(35, 16, 121),
(39, 17, 121),
(40, 17, 122),
(41, 17, 125),
(52, 20, 121),
(53, 20, 125),
(54, 20, 126),
(55, 20, 153),
(66, 28, 163),
(67, 28, 165),
(68, 29, 165),
(106, 42, 502),
(107, 42, 504),
(110, 48, 542),
(111, 49, 547),
(112, 50, 548),
(113, 51, 552),
(114, 52, 552),
(115, 53, 546),
(116, 54, 546),
(117, 55, 553),
(118, 56, 559),
(119, 57, 559),
(120, 58, 559),
(121, 59, 558),
(122, 60, 548),
(123, 61, 551);

-- --------------------------------------------------------

--
-- Table structure for table `issue_state`
--

CREATE TABLE `issue_state` (
  `id` int(11) NOT NULL,
  `issue_sprint_id` int(11) NOT NULL,
  `totalTask` int(11) DEFAULT '0',
  `totalToDo` int(11) DEFAULT '0',
  `totalDoing` int(11) DEFAULT '0',
  `totalDone` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `issue_state`
--

INSERT INTO `issue_state` (`id`, `issue_sprint_id`, `totalTask`, `totalToDo`, `totalDoing`, `totalDone`) VALUES
(3, 10, 2, 1, 1, 0),
(4, 22, 1, 1, 0, 0),
(5, 42, 2, 1, 1, 0),
(6, 44, 2, 1, 0, 1),
(7, 45, 2, 1, 0, 1),
(8, 46, 2, 1, 0, 1),
(9, 47, 2, 1, 0, 1),
(10, 54, 2, 1, 0, 1),
(11, 55, 2, 1, 0, 1),
(12, 69, 2, 1, 0, 1),
(13, 70, 2, 1, 0, 1),
(14, 79, 2, 1, 0, 1),
(15, 80, 2, 1, 0, 1),
(16, 82, 2, 1, 0, 1),
(17, 83, 2, 1, 0, 1),
(18, 86, 2, 1, 0, 1),
(19, 87, 2, 1, 0, 1),
(20, 94, 1, 1, 0, 0),
(21, 95, 2, 1, 1, 0),
(22, 96, 1, 0, 1, 0),
(23, 209, 2, 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`username`, `password`) VALUES
('coucou', '$2b$10$120fjer9PfOwGpHmudmQcO3Ft4YX2wESW8TgngqYAkoPGVffGVKC.'),
('jimmy', '$2b$10$p8OsfzHkHGf4kVPmRkK0gu8uZy6/Vq6Sh3kl0am34.kKb7/td2C3K'),
('rrkheloufi', '$2b$10$QhSzgNabyZPlxioiycBl5.43l.uK5wZhUve4/rASVM/M4JzV7QCmi'),
('Test', '$2b$10$Iqmq1M/j8MND6brE27fLteNLmCExgJTTBdVxDicKVukVHd2/xQEde'),
('Test2', '$2b$10$tEn1rfRSrmy.016PrKVpYOZfANQ43oFdpieonM7EyThpttJtIwv8W'),
('Test3', '$2b$10$SvvgUWlBa26MJmn6XS/aSujlZFOUFcJJr2DAKIPmtA4t3aVpOdBxy'),
('Testoftest', '$2b$10$axt.jgY8yLl3bpTsCwfkpeDoFkzyQiaOvlUst4jvLDXaf3ny6o92O'),
('user1', '$2b$10$YSA8Z/4yvUI58MM80wbU3uGmMejb8EEuuPt2gEud93amm8aExgEaa'),
('User10', '$2b$10$hCQqw.wxP33N2StFY9UgwOrBf.OEwG20UYwWo2FY0pUL8sulvkCVG'),
('user2', '$2b$10$SaRf1q7m9zN2I3lZtVdtLeEiddxSlMdQDisOOf58kXgm2hn3enyzG'),
('User5', '$2b$10$BardKSXjstuk/TuFGRvVBeEiMk17aJNtkHCPwZEFdKLy9nLeEuqSq'),
('User6', '$2b$10$urCL1YLmmDdhaTyNcwGDhuYaCHqMqYTdMQopBJnZOaoaVyd8.O1Wq'),
('UserProf', '$2b$10$7g3GESm7KcDeIPGH0YSsTeXoQbObZADp8STAabwl2zD1g9EQax9du'),
('UserRayan', '$2b$10$rgFiR6z1Sedn2f90xIxrWOuZ1gk1oMFo85eEi8c3QITFkI6sLvvLm');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `userGitHub` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `repositoryGitHub` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `userGitHub`, `repositoryGitHub`) VALUES
(2, 'Projet 1', 'Le projet est vraiment super', '', NULL),
(3, 'Projet 1', 'Le projet est vraiment super', 'elafosse', 'CDP_Tests'),
(8, 'Projet Fou', 'Une longue description', 'rrkheloufi', 'CDP_Tests'),
(9, 'Projet Fou 2', 'Une longue description', '', NULL),
(110, 'Bonjour', 'bonjour', 'elafosse', 'CDP_Tests'),
(121, 'jimtest', 'Description test', '', NULL),
(123, 'ProjectTest bis', 'Project to test the appli bis ça marche ?', 'elafosse', 'CDP_Release'),
(148, 'Test1', 'Ceci est le test1', '', ''),
(318, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(319, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(320, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(321, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(322, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(323, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(324, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(472, 'Jimmytest', 'eterdgj', '', ''),
(506, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(508, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(510, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(512, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(513, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(514, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(515, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(516, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(517, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(518, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(519, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(520, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(521, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(573, 'Project for tests', 'Project used to test the appli', 'elafosse', 'CDP_Tests'),
(586, 'jimtest', 'test', '', ''),
(587, 'jimtest', 'test', '', ''),
(588, 'jimtest', 'test', '', ''),
(589, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(590, 'New Name !', 'Description', 'gitHubLogin', 'gitHubRepo'),
(591, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(592, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(593, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(594, 'New Name !', 'Description', 'gitHubLogin', 'gitHubRepo'),
(595, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(596, 'Name', 'Description', 'gitHubLogin', 'gitHubRepo'),
(599, 'Projet CDP', 'Mettre en place un projet permettant d\'accompagner une équipe à l\'utilisation des méthodes SCRUM, en utilisant les principes de sprint, d\'issues et de tâches. Permettre à une équipe de savoir se positionner dans les sprints, et permettre à chaque utilisateur de comprendre facilement les tâches qui lui sont attribuées, celles à faire et celles en cours.  ', 'elafosse', 'CDP_Release'),
(600, 'Projet Web', 'Création d\'une application REST utilisant une api externe. Utilisation de l\'api \"WorldFood\" permettant de récupérer des recettes de plats. ', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `project_team`
--

CREATE TABLE `project_team` (
  `project_id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `project_team`
--

INSERT INTO `project_team` (`project_id`, `username`, `is_admin`) VALUES
(2, 'jimmy', 0),
(8, 'User5', 0),
(8, 'User5', 0),
(121, 'jimmy', 0),
(8, 'jimmy', 0),
(573, 'User5', 0),
(573, 'Test', 1),
(110, 'User5', 0),
(110, 'coucou', 1),
(123, 'coucou', 1),
(599, 'User5', 0),
(599, 'rrkheloufi', 1),
(600, 'user1', 0),
(600, 'rrkheloufi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sprint`
--

CREATE TABLE `sprint` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `objective` text COLLATE utf8_unicode_ci NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `release_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sprint`
--

INSERT INTO `sprint` (`id`, `project_id`, `objective`, `date_begin`, `date_end`, `release_id`) VALUES
(4, 3, 'Un objectif fort en couleur 2 ! Modifié art 2', '2019-11-01', '2019-03-20', -1),
(5, 3, 'azertyuiop', '2019-11-10', '2019-11-21', -1),
(7, 3, 'azertyuiopqsdfghjklm oula', '2019-09-05', '2020-01-10', -1),
(8, 3, 'Premier!!!', '2019-01-01', '2019-11-15', -1),
(9, 110, 'bonjour', '2019-11-26', '2019-11-29', 21773215),
(10, 110, 'gtdr', '2019-11-27', '2019-11-26', -1),
(12, 110, 'bgr', '2019-11-13', '2019-11-26', 21706864),
(15, 110, 'zfafzgjyt', '2019-11-28', '2019-11-28', -1),
(20, 110, 'vfgd', '2019-11-22', '2019-11-27', -1),
(24, 110, 'bonjour', '2019-11-21', '2019-11-21', -1),
(26, 110, 'nhnf', '2019-11-28', '2019-11-27', -1),
(27, 110, 'bgfb', '2019-11-20', '2019-11-27', -1),
(29, 110, 'bgfcb', '2019-11-22', '2019-11-21', -1),
(30, 110, 'vfdvd', '2019-11-21', '2019-11-21', -1),
(31, 110, 'Ca va pas marcher lol', '2019-11-13', '2019-11-20', -1),
(32, 148, 'Faire des tests', '2019-11-28', '2019-11-19', -1),
(38, 8, 'dzqefsr', '2019-12-04', '2019-12-25', -1),
(180, 8, 'asdzefxhv,bj', '2019-11-30', '2019-12-04', -1),
(274, 573, 'Test - bis', '2019-12-27', '2019-12-27', 21773215),
(276, 573, 'Ca marche', '2019-12-25', '2019-12-25', -1),
(277, 573, 'Ca marche 2', '2019-12-27', '2019-12-26', -1),
(288, 587, 'etets', '2019-12-10', '2019-12-13', -1),
(298, 121, 'test bars', '2019-12-02', '2019-12-16', -1),
(299, 599, 'Permettre à un utilisateur de s\'inscrire, se connecter et de créer/rejoindre un projet.\r\nMettre en place la création d\'Issues et de Tâches.', '2019-12-09', '2019-12-21', -1),
(300, 599, 'Implémentation des tests.\r\nRéaliser de la barre de navigation du site.', '2019-12-23', '2020-01-04', -1),
(301, 599, 'Implémentation de la release et de la documentation.\r\nPermettre un déploiement facile de l\'application', '2020-01-06', '2020-01-17', -1);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `realisation_time` int(11) NOT NULL,
  `description_of_done` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `project_id`, `name`, `description`, `state`, `start_date`, `realisation_time`, `description_of_done`) VALUES
(1, 2, 'rayan', 'blabla', 'To Do', '2019-11-06', 5, 'To finish :\r\n- First\r\n- Second'),
(2, 2, 'Task1 New', 'Bliblibli', 'Done', '1997-02-02', 5, 'DoD new'),
(10, 8, 'Task Projet 8', 'Description', 'Doing', '2019-05-10', 5, 'Definition of done blabla'),
(11, 8, 'Task Projet 8', 'Une vraie description qui permet de reprendre toutes les choses à comprendre pour cette tâche', 'Done', '2019-05-10', 5, 'Definition of done blabla'),
(12, 8, 'Test task oh', 'Une description test ouii', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(13, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(14, 8, 'Task Projet 8', 'Description', 'Done', '2019-05-10', 5, 'Definition of done blabla'),
(15, 8, 'Task Projet 8', 'Description', 'Done', '2019-05-10', 5, 'Definition of done blabla'),
(16, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(17, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(18, 8, 'Task Projet 8', 'Description', 'Doing', '2019-05-10', 5, 'Definition of done blabla'),
(19, 8, 'Task Projet 8', 'Description', 'Done', '2019-05-10', 5, 'Definition of done blabla'),
(22, 110, 'Update DataBase', 'add a new table for issues linked to task', 'Done', '2019-11-08', 1, 'An issue can be linked to a task'),
(24, 2, 'Test add tache finale', 'Description op', 'To Do', '2019-11-22', 15, 'Dod random'),
(28, 2, 'fgtdfhggggg', 'fdghdfgjhdg', 'Done', '2019-10-18', 15, 'dodododo'),
(29, 2, 'dfghdf', 'ghdfghdfgh', 'Done', '2019-11-03', 2, 'bk,l;'),
(30, 2, 'gdf', 'hjg', 'Doing', '2019-11-06', 10, 'ghjk'),
(38, 2, 'ghjkghkl', 'ljmk', 'To Do', '2019-11-19', 15, '1bnj;k,'),
(40, 2, 'hjklmlù', 'kmù*lmù*', 'Doing', '2019-11-28', 12, 'klmùjklmù'),
(51, 110, 'Test', 'Je teste un truc', 'To Do', '2019-11-22', 1, 'Je teste quelque chose'),
(52, 110, 'Testfsdh', 'Je teste quelque choseop;rdynf', 'To Do', '2019-10-15', 2, 'pojviojz,gvjg'),
(57, 3, 'Task 1', 'Helloooo', 'To Do', '2019-10-22', 3, 'Dod'),
(59, 3, 'Nouvelle tâche', 'une bonne description', 'Doing', '2019-10-22', 6, 'grosse dod'),
(60, 110, 'Test', 'Je teste un truc', 'To Do', '2019-11-21', 1, 'Je teste quelque chose'),
(61, 110, 'Test', 'Je teste quelque chose', 'Doing', '2019-11-08', 2, 'pojviojzfczfczq'),
(62, 110, 'Test3', 'J^jfipezjf', 'Done', '2019-11-08', 1, 'nyj,ukiulkuyhtgrsdvgnft'),
(63, 148, 'T1 - bis', 'Ceci est une task modifée', 'Done', '2019-11-01', 5, 'Ca marche ??? yes'),
(64, 148, 'T2', '', 'Doing', '2019-11-22', 1, 'Ceci est une task sans description'),
(72, 123, 'kghjfd', 'bhf', 'To Do', '2019-11-22', 1, 'btrg'),
(73, 506, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(74, 508, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(75, 510, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(76, 510, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(77, 512, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(78, 512, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(79, 513, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(80, 513, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(81, 514, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(82, 514, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(83, 515, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(84, 515, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(85, 516, 'Nom', 'Task Description', 'To Do', '2019-05-10', 10, 'Big dod'),
(86, 516, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(87, 517, 'Name Modified', 'Description', 'Done', '2019-06-10', 50, 'Big dod modified'),
(88, 517, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(89, 518, 'Name Modified', 'Description', 'Done', '2019-06-10', 50, 'Big dod modified'),
(90, 518, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(91, 519, 'Name Modified', 'Description', 'Done', '2019-06-10', 50, 'Big dod modified'),
(92, 519, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(93, 520, 'Name Modified', 'Description', 'Done', '2019-06-10', 50, 'Big dod modified'),
(94, 520, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(95, 521, 'Name Modified', 'Description', 'Done', '2019-06-10', 50, 'Big dod modified'),
(96, 521, 'Nom 2', 'Task Description 2', 'Doing', '2019-06-10', 5, 'Big dod'),
(103, 8, 'dzqefsrg', 'zqdefrs', 'Doing', '2019-12-13', 5, 'zqdefxrhvn,bj'),
(113, 123, 'nhtf', 'nhgn', 'To Do', '2019-12-12', 1, ',jg'),
(114, 8, 'efsdr', 'efrsgdt', 'Doing', '2019-12-18', 56, 'wsxdvfcbgvnh,bj'),
(115, 8, 'EFSRGD', 'TEEST', 'Doing', '2019-12-06', 2, 'ESGRDTHF'),
(128, 110, 'ngf', 'bhfg', 'To Do', '2019-12-12', 1, 'ngf'),
(130, 110, 'abcd', 'efgh', 'To Do', '2019-12-19', 2, 'yfn'),
(131, 123, ':lig', 'jkv', 'To Do', '2019-12-12', 2, 'ikjnhg'),
(132, 121, 'test', 'fhdfghj', 'To Do', '2019-12-11', 1, ''),
(133, 121, 'test2', 'fdhsdfgh', 'To Do', '2019-12-14', 1, ''),
(134, 121, 'gkgh', 'ffhjgkg', 'Doing', '2019-12-15', 1, ''),
(135, 121, 'hjkhm', 'dfhgjkghlk', 'Done', '2019-12-11', 1, ''),
(136, 121, 'ghhjfhjgk', 'sghghj', 'Done', '2019-12-11', 1, ''),
(137, 121, 'mjùk*ù', 'hj', 'To Do', '2019-12-10', 1, ''),
(138, 599, 'Base de données', 'Créer une base de donnée en MySQL nommée \"cdp_projet_gr1_eq7\".', 'Done', '2019-11-25', 1, 'Base de données créé est prête à être utilisée. '),
(139, 599, 'Créer tables dans la BD', 'Créer les tables de la base de données, finir la checklist.', 'Done', '2019-11-25', 1, 'Créer table \"project\" : id, name, description\r\nCréer table \"members\" : username, password\r\nCréer table \"project_team\" : project_id, username, is_admin\r\nCréer table \"issue\" : id, project_id, name, description, priority, difficulty\r\nCréer table \"task\" : id, project_id, name, description, state, date_beginning, realisation_time, description_of_done\r\nCréer table \"assigned_task\" : task_id, username\r\nCréer table \"task_dependencies\" : id, task_id, dependence\r\nCréer table \"task_checklist\" task_id, description, is_done\r\n'),
(140, 599, 'Fonctions BD', 'Créer la classe base de donnée avec les fonctions nécessaires', 'Done', '2019-11-25', 1, 'createProject(name, description) : void\r\ndeleteProject(username, projectId) : void //check if it\'s the admin\r\ncreateMember(username, password) : void\r\ndeleteMember(username, password) : void\r\nvalidateConnexion(username, password) : bool\r\ninviteMembersToProject(projectId, List<username> usernames, List<bool> admins);\r\n'),
(141, 599, 'Créer db_connection.js', 'Créer la classe permettant à l\'application de se connecter à la base de données.', 'Done', '2019-11-28', 1, 'Quand le site est capable de se connecter à la base de données.'),
(142, 599, 'Afficher les projets', 'Création du fichier \"listProjects.ejs\"', 'Doing', '2019-11-27', 1, 'Tous les projets d\'un membre sont disponible sur listProjects.ejs\r\nCliquer sur un projet redirige l\'utilisateur vers la page du projet cliqué\r\nUn bouton \"Nouveau Projet\" est disponible, et redirige un utilisateur vers newProject.ejs\r\nSi l\'utilisateur est admin/createur du projet, alors un bouton supprimer projet doit être disponible'),
(143, 599, 'Afficher les tâches', 'Création d\'une page HTML avec un tableau de trois colonnes pour les taches a faire/en cours/terminées.', 'Doing', '2019-11-28', 1, 'Création de la page HTML\r\nUn utilisateur peut savoir facilement si une tache est à faire, en cours ou terminée car la tâche est disponible dans le tableau'),
(144, 599, 'Tâches dans la BdD', 'Récupération des tâches d\'un projet dans la BdD pour les afficher', 'Doing', '2019-11-27', 0, 'Récupérer les tâches concernant un projet à l\'aide de la classe contenant les méthodes de récupération des informations dans la base de données\r\nRanger les tâches dans le tableau en fonction de leur état'),
(145, 599, 'Etat d\'une tâche', 'Modification de l\'état d\'une tâche', 'Doing', '2019-11-27', 1, 'Création de la page html du formulaire avec : nom de la tache (input text), Description (textarea), état (input radio), date de début (input date), durée (input number, en jour/homme), son DoD (textarea), les membres du projets affectés (liste avec les noms des membres du groupe, l\'utilisateur selectionne les bons), les tâches pré-requises (liste avec les noms des taches, l\'utilisateur selectionne les pré-requis), les issues associées (liste avec le nom des issues, l\'utilisateur selection celles en relation)\r\nInformations enregistrées dans la BdD\r\nAjout des liens permettant d\'accéder au formulaire dans la liste des tâches'),
(146, 599, 'Modification de tâche	', 'Modifier tous les champs d\'une tâche.', 'Doing', '2019-11-27', 1, 'Ajout du bouton \"modifier\" permettant d\'afficher le formulaire.\r\nAffichage du formulaire d\'une tâche avec les informations de celle-ci prérempli dans les bons champs\r\nModifications effectuées dans la BdD'),
(147, 599, 'Supprimer une tâche	', 'Supprimer définitivement une tâche. ', 'To Do', '2019-11-28', 1, 'Bouton \" supprimer \" pour supprimer a tâche correspondante sur la page des détails d\'une tache\r\nCréation d\'une alerte demandant la confirmation de suppression de la tâche\r\nSuppression de la tache dans la BdD'),
(148, 599, '	Lien vers les issues liées à une tâche', 'Lien vers les issues liées à une tâche', 'To Do', '2019-11-28', 1, 'Dans la page des informations d\'une tâche, les issues associées disposent de liens cliquables vers les pages des infos des dites issues. (href sur le nom lui même ou petite icone de lien derrière chaque issue)');

-- --------------------------------------------------------

--
-- Table structure for table `task_checklist`
--

CREATE TABLE `task_checklist` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `is_done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `task_checklist`
--

INSERT INTO `task_checklist` (`id`, `task_id`, `description`, `is_done`) VALUES
(4, 19, 'OUOUOUO', 12);

-- --------------------------------------------------------

--
-- Table structure for table `task_dependencies`
--

CREATE TABLE `task_dependencies` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `depend_on_task_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `task_dependencies`
--

INSERT INTO `task_dependencies` (`id`, `task_id`, `depend_on_task_id`) VALUES
(19, 10, 2),
(20, 11, 2),
(23, 14, 2),
(24, 15, 2),
(25, 16, 2),
(26, 17, 2),
(27, 18, 2),
(28, 19, 2),
(37, 28, 1),
(38, 28, 2),
(47, 38, 2),
(50, 40, 2),
(88, 52, 22),
(89, 52, 51),
(90, 52, 52),
(96, 24, 1),
(97, 51, 2),
(98, 51, 2),
(111, 60, 2),
(112, 60, 2),
(113, 62, 22),
(114, 62, 51),
(115, 59, 57),
(116, 59, 59),
(120, 63, 63),
(121, 63, 64),
(127, 1, 1),
(130, 80, 79),
(131, 82, 81),
(132, 84, 83),
(133, 86, 85),
(134, 88, 87),
(135, 90, 89),
(136, 92, 91),
(137, 94, 93),
(138, 96, 95),
(139, 95, 96),
(146, 103, 1),
(160, 114, 10),
(161, 115, 11),
(162, 13, 10),
(163, 13, 12),
(176, 130, 22),
(177, 130, 51),
(178, 131, 72),
(180, 139, 138),
(181, 140, 138),
(182, 140, 139),
(183, 141, 139),
(184, 141, 140),
(185, 148, 139);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `expected_result` text COLLATE utf8_unicode_ci NOT NULL,
  `last_version_validated` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `state` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `project_id`, `name`, `description`, `expected_result`, `last_version_validated`, `state`) VALUES
(4, 110, 't2', 'test 2', 're 2', 'v 0.0.1', 'passed'),
(9, 110, 'bonjour', 'fre', 'undefined', 'undefined', 'failed'),
(11, 3, 'gtgt', 'ggtgt', 'undefined', 'undefined', 'passed'),
(12, 110, 'Hello', 'ceci est un test', 'undefined', 'undefined', 'todo'),
(16, 3, 'gtgt', 'On teste la partie', 'le résultat expected est blablabla', 'v0.0.1', 'todo'),
(17, 3, 'Test 2', 'Uen deuxième description', 'Hola hola', 'v0.0.54', 'passed'),
(18, 3, 'Un test avec \" et \' dedans', 'On teste la partie \" \'', 'le résulta;;t expect;;;;;;;;;;;;ed est blablabla', 'v0.0.1de\"\'', 'failed'),
(20, 3, 'Le titre est différent maintenant', 'hjbhbjeedhbjedq ;;;;\"\"\":::', ';;;;;;;;;;;; \"\"\"\"', '\"\"\"\'!!!', 'todo'),
(23, 110, 'test', 'gtrdgdr', 'btrf', 'bhftd', 'todo'),
(28, 148, 'Test1', 'un test', 'jtyhtgrghyjèuhtdbfhryhtf2gb3435456h4y65yr', '324', 'todo'),
(29, 148, 'Test2', 'hythjyrfhtrhr', '3546468gtrgrds', '365', 'failed'),
(42, 573, 'Test1 bis', 'Ca marche', 'Ca marche', '0.1.0', 'todo'),
(44, 587, 'test', 'dfghdfh', 'dfghdf', 'dsfgsdfg', 'todo'),
(48, 123, 'T1', 'bgtdre', 'vfd', 'vfd', 'todo'),
(49, 599, 'Ajouter un projet', 'addProject(...)', 'Integer', 'v.0.0.1', 'todo'),
(50, 599, 'Modifier un projet', 'updateProject(projectId, ...)', 'Integer', 'v0.0.1', 'todo'),
(51, 599, 'Ajouter une tâche', 'addTask(...)', 'Integer', 'v0.0.1', 'todo'),
(52, 599, 'Modifier une tâche', 'updateTask(...)', 'string : \"Task updated\"', 'v0.0.1', 'failed'),
(53, 599, 'Connexion', 'areUsernameAndPasswordCorrect(username, password)', 'boolean : (si les informations sont correctes ou non)', 'v0.0.1', 'passed'),
(54, 599, 'Deconnexion', 'signOut(username)', 'User is signed out', 'v0.0.1', 'passed'),
(55, 599, 'Accéder à l\'issue d\'une tâche', 'getIssuesOfTask(...)', 'Retourne les issues liées à la tâche choisie', 'v0.0.1', 'todo'),
(56, 599, 'Ajouter une release', 'addReleaseFromGithubProject(username, password)', 'Retourne les release d\'un repo github', 'v0.0.1', 'todo'),
(57, 599, 'Ajouter un test', 'addTest(...)', 'Integer', 'v0.0.1', 'todo'),
(58, 599, 'Modifier un test', 'updateTest(testId, ...)', 'string : \"Test updated\"', 'v0.0.1', 'todo'),
(59, 599, 'Inviter des membres', 'addMembers(listMembers[])', 'boolean : Retourne si l\'opération à fonctionné ou non', 'v0.0.1', 'todo'),
(60, 599, 'Supprimer des membres', 'removeMembersFromProject(projectId, listMembers[]). Supprimer des membres existants, et d\'autres n\'existant pas. Supprimer des utilisateurs qui ne sont pas dans le projet.', 'boolean : Retourne si l\'opération à fonctionné ou non', 'v0.0.1', 'failed'),
(61, 599, 'Récupérer la liste des tâches d\'un projet', 'getTasksFromProject(projectId). Tester avec des id existants et non-existants. ', 'Retourne toutes les tâches d\'un projet donné en paramètre.', 'v0.0.1', 'passed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigned_task`
--
ALTER TABLE `assigned_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_task_ibfk_1` (`task_id`),
  ADD KEY `assigned_task_ibfk_2` (`username`);

--
-- Indexes for table `documentation_of_release`
--
ALTER TABLE `documentation_of_release`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `issue`
--
ALTER TABLE `issue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_ibfk_1` (`project_id`);

--
-- Indexes for table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `sprint_id` (`sprint_id`);

--
-- Indexes for table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `test_id` (`test_id`);

--
-- Indexes for table `issue_state`
--
ALTER TABLE `issue_state`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_sprint_id` (`issue_sprint_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_team`
--
ALTER TABLE `project_team`
  ADD KEY `project_team_ibfk_1` (`project_id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sprint_ibfk_1` (`project_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `task_checklist`
--
ALTER TABLE `task_checklist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_checklist_ibfk_1` (`task_id`);

--
-- Indexes for table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_dependencies_ibfk_1` (`task_id`),
  ADD KEY `task_dependencies_ibfk_2` (`depend_on_task_id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigned_task`
--
ALTER TABLE `assigned_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT for table `documentation_of_release`
--
ALTER TABLE `documentation_of_release`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `issue`
--
ALTER TABLE `issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=562;

--
-- AUTO_INCREMENT for table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=491;

--
-- AUTO_INCREMENT for table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

--
-- AUTO_INCREMENT for table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `issue_state`
--
ALTER TABLE `issue_state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=601;

--
-- AUTO_INCREMENT for table `sprint`
--
ALTER TABLE `sprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=302;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `task_checklist`
--
ALTER TABLE `task_checklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assigned_task`
--
ALTER TABLE `assigned_task`
  ADD CONSTRAINT `assigned_task_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assigned_task_ibfk_2` FOREIGN KEY (`username`) REFERENCES `member` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issue`
--
ALTER TABLE `issue`
  ADD CONSTRAINT `issue_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  ADD CONSTRAINT `issue_of_sprint_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_sprint_ibfk_2` FOREIGN KEY (`sprint_id`) REFERENCES `sprint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  ADD CONSTRAINT `issue_of_task_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_task_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  ADD CONSTRAINT `issue_of_test_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_test_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issue_state`
--
ALTER TABLE `issue_state`
  ADD CONSTRAINT `issue_state_ibfk_1` FOREIGN KEY (`issue_sprint_id`) REFERENCES `issue_of_sprint` (`id`);

--
-- Constraints for table `project_team`
--
ALTER TABLE `project_team`
  ADD CONSTRAINT `project_team_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_team_ibfk_2` FOREIGN KEY (`username`) REFERENCES `member` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `task_checklist`
--
ALTER TABLE `task_checklist`
  ADD CONSTRAINT `task_checklist_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  ADD CONSTRAINT `task_dependencies_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_dependencies_ibfk_2` FOREIGN KEY (`depend_on_task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
