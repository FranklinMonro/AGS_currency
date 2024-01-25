--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

-- Started on 2024-01-24 04:39:07 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16387)
-- Name: currency_conversion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.currency_conversion (
    id uuid NOT NULL,
    from_country character(50) NOT NULL,
    to_country character(50) NOT NULL,
    from_amount character(50) NOT NULL,
    currency_name character(50) NOT NULL,
    rate character(50) NOT NULL,
    rate_for_amount character(50) NOT NULL,
    converted_date date NOT NULL
);


ALTER TABLE public.currency_conversion OWNER TO postgres;

--
-- TOC entry 3347 (class 0 OID 16387)
-- Dependencies: 215
-- Data for Name: currency_conversion; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3203 (class 2606 OID 16391)
-- Name: currency_conversion currency_conversion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currency_conversion
    ADD CONSTRAINT currency_conversion_pkey PRIMARY KEY (id);


-- Completed on 2024-01-24 04:39:07 UTC

--
-- PostgreSQL database dump complete
--

