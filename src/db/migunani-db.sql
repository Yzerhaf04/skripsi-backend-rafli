--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-06-05 05:27:19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16994)
-- Name: barang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.barang (
    barang_id integer NOT NULL,
    barang_name character varying(50) NOT NULL,
    kategori_id integer NOT NULL,
    satuan_id integer NOT NULL
);


ALTER TABLE public.barang OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17024)
-- Name: belanja_harian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.belanja_harian (
    bh_id integer NOT NULL,
    bh_name character varying(50) NOT NULL,
    bh_date date NOT NULL,
    barang_id integer NOT NULL,
    toko_id integer NOT NULL,
    jumlah_barang integer NOT NULL
);


ALTER TABLE public.belanja_harian OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16979)
-- Name: kategori; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kategori (
    kategori_id integer NOT NULL,
    kategori_name character varying(50) NOT NULL
);


ALTER TABLE public.kategori OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17009)
-- Name: penggunaan_harian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.penggunaan_harian (
    ph_id integer NOT NULL,
    ph_name character varying(50) NOT NULL,
    ph_date date NOT NULL,
    barang_id integer NOT NULL,
    toko_id integer NOT NULL,
    jumlah_barang integer NOT NULL
);


ALTER TABLE public.penggunaan_harian OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16984)
-- Name: satuan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.satuan (
    satuan_id integer NOT NULL,
    satuan_name character varying(50) NOT NULL
);


ALTER TABLE public.satuan OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17039)
-- Name: stok_opname; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stok_opname (
    so_id integer NOT NULL,
    so_name character varying(50) NOT NULL,
    so_date date NOT NULL,
    barang_id integer NOT NULL,
    toko_id integer NOT NULL,
    jumlah_barang integer NOT NULL
);


ALTER TABLE public.stok_opname OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16989)
-- Name: toko; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.toko (
    toko_id integer NOT NULL,
    toko_name character varying(50) NOT NULL
);


ALTER TABLE public.toko OWNER TO postgres;

--
-- TOC entry 4935 (class 0 OID 16994)
-- Dependencies: 220
-- Data for Name: barang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.barang (barang_id, barang_name, kategori_id, satuan_id) FROM stdin;
\.


--
-- TOC entry 4937 (class 0 OID 17024)
-- Dependencies: 222
-- Data for Name: belanja_harian; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.belanja_harian (bh_id, bh_name, bh_date, barang_id, toko_id, jumlah_barang) FROM stdin;
\.


--
-- TOC entry 4932 (class 0 OID 16979)
-- Dependencies: 217
-- Data for Name: kategori; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kategori (kategori_id, kategori_name) FROM stdin;
1	Sayuran
2	Minuman
3	Bumbu Kering
4	Bumbu Basah
5	Utama
\.


--
-- TOC entry 4936 (class 0 OID 17009)
-- Dependencies: 221
-- Data for Name: penggunaan_harian; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.penggunaan_harian (ph_id, ph_name, ph_date, barang_id, toko_id, jumlah_barang) FROM stdin;
\.


--
-- TOC entry 4933 (class 0 OID 16984)
-- Dependencies: 218
-- Data for Name: satuan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.satuan (satuan_id, satuan_name) FROM stdin;
1	kg
2	pcs
6	dus
3	ekor
4	botol
5	liter
7	liter
\.


--
-- TOC entry 4938 (class 0 OID 17039)
-- Dependencies: 223
-- Data for Name: stok_opname; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stok_opname (so_id, so_name, so_date, barang_id, toko_id, jumlah_barang) FROM stdin;
\.


--
-- TOC entry 4934 (class 0 OID 16989)
-- Dependencies: 219
-- Data for Name: toko; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.toko (toko_id, toko_name) FROM stdin;
1	Kampung Hutan
2	Bintaro Kesehatan
3	BSD
\.


--
-- TOC entry 4772 (class 2606 OID 16998)
-- Name: barang barang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barang
    ADD CONSTRAINT barang_pkey PRIMARY KEY (barang_id);


--
-- TOC entry 4776 (class 2606 OID 17028)
-- Name: belanja_harian belanja_harian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.belanja_harian
    ADD CONSTRAINT belanja_harian_pkey PRIMARY KEY (bh_id);


--
-- TOC entry 4766 (class 2606 OID 16983)
-- Name: kategori kategori_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategori
    ADD CONSTRAINT kategori_pkey PRIMARY KEY (kategori_id);


--
-- TOC entry 4774 (class 2606 OID 17013)
-- Name: penggunaan_harian penggunaan_harian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.penggunaan_harian
    ADD CONSTRAINT penggunaan_harian_pkey PRIMARY KEY (ph_id);


--
-- TOC entry 4768 (class 2606 OID 16988)
-- Name: satuan satuan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.satuan
    ADD CONSTRAINT satuan_pkey PRIMARY KEY (satuan_id);


--
-- TOC entry 4778 (class 2606 OID 17043)
-- Name: stok_opname stok_opname_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stok_opname
    ADD CONSTRAINT stok_opname_pkey PRIMARY KEY (so_id);


--
-- TOC entry 4770 (class 2606 OID 16993)
-- Name: toko toko_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toko
    ADD CONSTRAINT toko_pkey PRIMARY KEY (toko_id);


--
-- TOC entry 4783 (class 2606 OID 17029)
-- Name: belanja_harian fk_barang_bh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.belanja_harian
    ADD CONSTRAINT fk_barang_bh FOREIGN KEY (barang_id) REFERENCES public.barang(barang_id);


--
-- TOC entry 4781 (class 2606 OID 17014)
-- Name: penggunaan_harian fk_barang_ph; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.penggunaan_harian
    ADD CONSTRAINT fk_barang_ph FOREIGN KEY (barang_id) REFERENCES public.barang(barang_id);


--
-- TOC entry 4785 (class 2606 OID 17044)
-- Name: stok_opname fk_barang_so; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stok_opname
    ADD CONSTRAINT fk_barang_so FOREIGN KEY (barang_id) REFERENCES public.barang(barang_id);


--
-- TOC entry 4779 (class 2606 OID 16999)
-- Name: barang fk_kategori; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barang
    ADD CONSTRAINT fk_kategori FOREIGN KEY (kategori_id) REFERENCES public.kategori(kategori_id);


--
-- TOC entry 4780 (class 2606 OID 17004)
-- Name: barang fk_satuan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barang
    ADD CONSTRAINT fk_satuan FOREIGN KEY (satuan_id) REFERENCES public.satuan(satuan_id);


--
-- TOC entry 4784 (class 2606 OID 17034)
-- Name: belanja_harian fk_toko_bh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.belanja_harian
    ADD CONSTRAINT fk_toko_bh FOREIGN KEY (toko_id) REFERENCES public.toko(toko_id);


--
-- TOC entry 4782 (class 2606 OID 17019)
-- Name: penggunaan_harian fk_toko_ph; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.penggunaan_harian
    ADD CONSTRAINT fk_toko_ph FOREIGN KEY (toko_id) REFERENCES public.toko(toko_id);


--
-- TOC entry 4786 (class 2606 OID 17049)
-- Name: stok_opname fk_toko_so; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stok_opname
    ADD CONSTRAINT fk_toko_so FOREIGN KEY (toko_id) REFERENCES public.toko(toko_id);


-- Completed on 2026-06-05 05:27:19

--
-- PostgreSQL database dump complete
--

