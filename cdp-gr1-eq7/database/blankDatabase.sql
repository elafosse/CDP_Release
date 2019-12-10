-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mer. 04 déc. 2019 à 22:32
-- Version du serveur :  8.0.13-4
-- Version de PHP :  7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `scrumhelper`
--
CREATE DATABASE IF NOT EXISTS `scrumhelper` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `scrumhelper`;

-- --------------------------------------------------------

--
-- Structure de la table `assigned_task`
--

CREATE TABLE `assigned_task` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `documentation_of_release`
--

CREATE TABLE `documentation_of_release` (
  `id` int(11) NOT NULL,
  `url` text COLLATE utf8_unicode_ci NOT NULL,
  `release_id` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `issue`
--

CREATE TABLE `issue` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `priority` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `difficulty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `issue_of_sprint`
--

CREATE TABLE `issue_of_sprint` (
  `id` int(11) NOT NULL,
  `sprint_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `issue_of_task`
--

CREATE TABLE `issue_of_task` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Structure de la table `issue_of_test`
--

CREATE TABLE `issue_of_test` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `issue_state`
--

CREATE TABLE `issue_state` (
  `id` int(11) NOT NULL,
  `issue_sprint_id` int(11) NOT NULL,
  `totalTask` int(11) DEFAULT '0',
  `totalToDo` int(11) DEFAULT '0',
  `totalDoing` int(11) DEFAULT '0',
  `totalDone` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `member`
--

CREATE TABLE `member` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `userGitHub` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `repositoryGitHub` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Structure de la table `project_team`
--

CREATE TABLE `project_team` (
  `project_id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Structure de la table `sprint`
--

CREATE TABLE `sprint` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `objective` text COLLATE utf8_unicode_ci NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `release_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `task`
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

-- --------------------------------------------------------

--
-- Structure de la table `task_checklist`
--

CREATE TABLE `task_checklist` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `is_done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `task_dependencies`
--

CREATE TABLE `task_dependencies` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `depend_on_task_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `test`
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
-- Index pour les tables déchargées
--

--
-- Index pour la table `assigned_task`
--
ALTER TABLE `assigned_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_task_ibfk_1` (`task_id`),
  ADD KEY `assigned_task_ibfk_2` (`username`);

--
-- Index pour la table `documentation_of_release`
--
ALTER TABLE `documentation_of_release`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `issue`
--
ALTER TABLE `issue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_ibfk_1` (`project_id`);

--
-- Index pour la table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `sprint_id` (`sprint_id`);

--
-- Index pour la table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Index pour la table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `test_id` (`test_id`);

--
-- Index pour la table `issue_state`
--
ALTER TABLE `issue_state`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_sprint_id` (`issue_sprint_id`);

--
-- Index pour la table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `project_team`
--
ALTER TABLE `project_team`
  ADD KEY `project_team_ibfk_1` (`project_id`),
  ADD KEY `username` (`username`);

--
-- Index pour la table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sprint_ibfk_1` (`project_id`);

--
-- Index pour la table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Index pour la table `task_checklist`
--
ALTER TABLE `task_checklist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_checklist_ibfk_1` (`task_id`);

--
-- Index pour la table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_dependencies_ibfk_1` (`task_id`),
  ADD KEY `task_dependencies_ibfk_2` (`depend_on_task_id`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `assigned_task`
--
ALTER TABLE `assigned_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `documentation_of_release`
--
ALTER TABLE `documentation_of_release`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `issue`
--
ALTER TABLE `issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `issue_state`
--
ALTER TABLE `issue_state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sprint`
--
ALTER TABLE `sprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `task_checklist`
--
ALTER TABLE `task_checklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `assigned_task`
--
ALTER TABLE `assigned_task`
  ADD CONSTRAINT `assigned_task_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assigned_task_ibfk_2` FOREIGN KEY (`username`) REFERENCES `member` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue`
--
ALTER TABLE `issue`
  ADD CONSTRAINT `issue_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  ADD CONSTRAINT `issue_of_sprint_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_sprint_ibfk_2` FOREIGN KEY (`sprint_id`) REFERENCES `sprint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  ADD CONSTRAINT `issue_of_task_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_task_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  ADD CONSTRAINT `issue_of_test_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_test_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue_state`
--
ALTER TABLE `issue_state`
  ADD CONSTRAINT `issue_state_ibfk_1` FOREIGN KEY (`issue_sprint_id`) REFERENCES `issue_of_sprint` (`id`);

--
-- Contraintes pour la table `project_team`
--
ALTER TABLE `project_team`
  ADD CONSTRAINT `project_team_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_team_ibfk_2` FOREIGN KEY (`username`) REFERENCES `member` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `task_checklist`
--
ALTER TABLE `task_checklist`
  ADD CONSTRAINT `task_checklist_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  ADD CONSTRAINT `task_dependencies_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_dependencies_ibfk_2` FOREIGN KEY (`depend_on_task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
