-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-03-2021 a las 06:32:05
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `infinety_contable`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apuntes__gastos`
--

CREATE TABLE `apuntes__gastos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Categoría_Gasto` char(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Subcategoría_Gasto` char(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Importe` int(11) NOT NULL DEFAULT 0,
  `Concepto` char(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `apuntes__gastos`
--

INSERT INTO `apuntes__gastos` (`id`, `Categoría_Gasto`, `Subcategoría_Gasto`, `Importe`, `Concepto`, `created_at`, `updated_at`) VALUES
(6, '1', '1', 1221213, 'Confi', '2021-02-18 06:45:12', '2021-02-18 01:45:12'),
(8, '2', '3', 432432312, 'Inf', '2021-02-18 07:03:21', '2021-02-18 02:03:21'),
(9, '1', '4', 12321321, 'det', '2021-02-18 07:08:57', '2021-02-18 02:08:57'),
(10, '2', '2', 432432, 'defetFt Boca', '2021-02-18 07:14:15', '2021-02-18 02:24:28'),
(11, '1', '3', 132131, 'Info Teck 2', '2021-02-18 07:25:02', '2021-02-18 02:25:02'),
(12, '1', '4', 213213, 'Got Stark', '2021-02-18 15:16:43', '2021-02-18 10:16:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_gastos`
--

CREATE TABLE `categorias_gastos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre_Categorias` char(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tipo_Categoria` enum('Gasto vital','Gasto no vital') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Gasto vital',
  `Estado_Categoria` enum('Activado','Desactivado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Activado',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias_gastos`
--

INSERT INTO `categorias_gastos` (`id`, `Nombre_Categorias`, `Tipo_Categoria`, `Estado_Categoria`, `created_at`, `updated_at`) VALUES
(1, 'Pruebas', 'Gasto no vital', 'Activado', '2021-02-10 22:32:31', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gestion__ingresos`
--

CREATE TABLE `gestion__ingresos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre_Tipo_Entradas` char(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Estado` enum('Positivo','Negativo') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Positivo',
  `Tipo_Ingreso` enum('Unico','Multiple Mensual') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Unico',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gestion__ingresos`
--

INSERT INTO `gestion__ingresos` (`id`, `Nombre_Tipo_Entradas`, `Estado`, `Tipo_Ingreso`, `created_at`, `updated_at`) VALUES
(30, 'Adios amor ...', 'Positivo', 'Multiple Mensual', '2021-02-16 09:51:15', '2021-02-16 21:51:15'),
(31, 'Nodal Data', 'Positivo', 'Multiple Mensual', '2021-02-16 09:55:53', '2021-02-17 13:26:59'),
(32, 'Luigi 22', 'Negativo', 'Unico', '2021-02-16 10:16:14', '2021-02-17 14:00:37'),
(34, 'Hudson River', 'Negativo', 'Multiple Mensual', '2021-02-16 11:31:18', '2021-02-16 23:31:18'),
(35, 'Catarcio', 'Positivo', 'Multiple Mensual', '2021-02-17 14:00:56', '2021-02-18 02:00:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2021_02_02_053849_create_categorias__gastos_table', 1),
(5, '2021_02_02_054033_create_subcategorias__gastos_table', 1),
(6, '2021_02_02_054134_create_apuntes__gastos_table', 2),
(7, '2021_02_02_054200_create_gestion__ingresos_table', 2),
(8, '2021_02_04_004032_categorias_gastos', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategorias__gastos`
--

CREATE TABLE `subcategorias__gastos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre_Subcategorias` char(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tipo_Gasto_Mensual` enum('Fijo','Multiple') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Fijo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `subcategorias__gastos`
--

INSERT INTO `subcategorias__gastos` (`id`, `Nombre_Subcategorias`, `Tipo_Gasto_Mensual`, `created_at`, `updated_at`) VALUES
(1, 'Maquete', 'Multiple', '2021-02-13 05:09:03', NULL),
(3, 'Info Teck', 'Multiple', '2021-02-12 10:11:18', '2021-02-12 10:11:18'),
(4, 'Gota', 'Multiple', '2021-02-12 10:59:12', '2021-02-18 20:49:26'),
(5, 'Ismael Infinet', 'Fijo', '2021-02-12 21:51:18', '2021-02-12 21:51:18'),
(6, 'Ismael Infinet', 'Fijo', '2021-02-12 21:51:28', '2021-02-12 21:51:28'),
(7, 'data', 'Multiple', '2021-02-18 20:47:32', '2021-02-18 20:47:32'),
(8, 'batman', 'Fijo', '2021-02-18 20:50:20', '2021-02-18 20:50:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Fernando', 'erickfernando_20@hotmail.com', NULL, '$2y$10$akrgU5rPFhwMPsPF/IUoEuhqlhjJzoUWz8jhFxljSLpv7PfM8Pl82', NULL, '2021-02-03 07:45:22', '2021-02-03 07:45:22');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `apuntes__gastos`
--
ALTER TABLE `apuntes__gastos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias_gastos`
--
ALTER TABLE `categorias_gastos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `gestion__ingresos`
--
ALTER TABLE `gestion__ingresos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `subcategorias__gastos`
--
ALTER TABLE `subcategorias__gastos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apuntes__gastos`
--
ALTER TABLE `apuntes__gastos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `categorias_gastos`
--
ALTER TABLE `categorias_gastos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gestion__ingresos`
--
ALTER TABLE `gestion__ingresos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `subcategorias__gastos`
--
ALTER TABLE `subcategorias__gastos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
