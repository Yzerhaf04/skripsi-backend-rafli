-- ==========================================
-- 1. PEMBUATAN TABEL MASTER (TIDAK ADA FOREIGN KEY)
-- ==========================================

-- Tabel Kategori
CREATE TABLE public.kategori (
    kategori_id integer NOT NULL PRIMARY KEY,
    kategori_name character varying(50) NOT NULL
);

-- Tabel Satuan
CREATE TABLE public.satuan (
    satuan_id integer NOT NULL PRIMARY KEY,
    satuan_name character varying(50) NOT NULL
);

-- Tabel Toko
CREATE TABLE public.toko (
    toko_id integer NOT NULL PRIMARY KEY,
    toko_name character varying(50) NOT NULL
);

-- Tabel User Role
CREATE TABLE public.user_role (
    ur_id integer NOT NULL PRIMARY KEY,
    ur_name character varying(50) NOT NULL
);

-- Tabel Tempat Simpan
CREATE TABLE public.tempat_simpan (
    ts_id integer NOT NULL PRIMARY KEY,
    ts_name character varying(100) NOT NULL
);


-- ==========================================
-- 2. PEMBUATAN TABEL DENGAN DEPENDENSI TINGKAT 1
-- ==========================================

-- Tabel User List (Bergantung pada user_role)
CREATE TABLE public.user_list (
    ul_id integer NOT NULL PRIMARY KEY,
    ul_name character varying(100) NOT NULL,
    ul_password character varying(255) NOT NULL,
    ur_id integer NOT NULL,
    
    CONSTRAINT fk_userlist_userrole FOREIGN KEY (ur_id) 
        REFERENCES public.user_role (ur_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabel Barang (Bergantung pada kategori, satuan, dan tempat_simpan)
CREATE TABLE public.barang (
    barang_id integer NOT NULL PRIMARY KEY,
    barang_name character varying(50) NOT NULL,
    kategori_id integer NOT NULL,
    satuan_id integer NOT NULL,
    ts_id integer NOT NULL,
    
    CONSTRAINT fk_barang_kategori FOREIGN KEY (kategori_id) 
        REFERENCES public.kategori (kategori_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_barang_satuan FOREIGN KEY (satuan_id) 
        REFERENCES public.satuan (satuan_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_barang_tempatsimpan FOREIGN KEY (ts_id) 
        REFERENCES public.tempat_simpan (ts_id) ON DELETE RESTRICT ON UPDATE CASCADE
);


-- ==========================================
-- 3. PEMBUATAN TABEL HEADER TRANSAKSI (DEPENDENSI TINGKAT 2)
-- ==========================================

-- Header Stok Opname
CREATE TABLE public.stok_opname (
    so_id integer NOT NULL PRIMARY KEY,
    so_name character varying(50) NOT NULL,
    so_date date NOT NULL,
    toko_id integer NOT NULL,
    
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_at timestamp with time zone,
    updated_by integer,
    
    CONSTRAINT fk_so_toko FOREIGN KEY (toko_id) 
        REFERENCES public.toko (toko_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_so_created_by FOREIGN KEY (created_by) 
        REFERENCES public.user_list (ul_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_so_updated_by FOREIGN KEY (updated_by) 
        REFERENCES public.user_list (ul_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Header Barang Keluar
CREATE TABLE public.barang_keluar (
    bk_id integer NOT NULL PRIMARY KEY,
    bk_name character varying(50) NOT NULL,
    bk_date date NOT NULL,
    toko_id integer NOT NULL,
    
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_at timestamp with time zone,
    updated_by integer,
    
    CONSTRAINT fk_bk_toko FOREIGN KEY (toko_id) 
        REFERENCES public.toko (toko_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_bk_created_by FOREIGN KEY (created_by) 
        REFERENCES public.user_list (ul_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_bk_updated_by FOREIGN KEY (updated_by) 
        REFERENCES public.user_list (ul_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Header Barang Masuk
CREATE TABLE public.barang_masuk (
    bm_id integer NOT NULL PRIMARY KEY,
    bm_name character varying(50) NOT NULL,
    bm_date date NOT NULL,
    toko_id integer NOT NULL,
    
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_at timestamp with time zone,
    updated_by integer,
    
    CONSTRAINT fk_bm_toko FOREIGN KEY (toko_id) 
        REFERENCES public.toko (toko_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_bm_created_by FOREIGN KEY (created_by) 
        REFERENCES public.user_list (ul_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_bm_updated_by FOREIGN KEY (updated_by) 
        REFERENCES public.user_list (ul_id) ON DELETE RESTRICT ON UPDATE CASCADE
);


-- ==========================================
-- 4. PEMBUATAN TABEL DETAIL TRANSAKSI (DEPENDENSI TINGKAT 3)
-- ==========================================

-- Detail Stok Opname
CREATE TABLE public.stok_opname_detail (
    sod_id integer NOT NULL PRIMARY KEY,
    so_id integer NOT NULL,
    barang_id integer NOT NULL,
    jumlah_barang integer NOT NULL,
    
    CONSTRAINT fk_sod_header FOREIGN KEY (so_id) 
        REFERENCES public.stok_opname (so_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_sod_barang FOREIGN KEY (barang_id) 
        REFERENCES public.barang (barang_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Detail Barang Keluar
CREATE TABLE public.barang_keluar_detail (
    bkd_id integer NOT NULL PRIMARY KEY,
    bk_id integer NOT NULL,
    barang_id integer NOT NULL,
    jumlah_barang integer NOT NULL,
    
    CONSTRAINT fk_bkd_header FOREIGN KEY (bk_id) 
        REFERENCES public.barang_keluar (bk_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_bkd_barang FOREIGN KEY (barang_id) 
        REFERENCES public.barang (barang_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Detail Barang Masuk
CREATE TABLE public.barang_masuk_detail (
    bmd_id integer NOT NULL PRIMARY KEY,
    bm_id integer NOT NULL,
    barang_id integer NOT NULL,
    jumlah_barang integer NOT NULL,
    
    CONSTRAINT fk_bmd_header FOREIGN KEY (bm_id) 
        REFERENCES public.barang_masuk (bm_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_bmd_barang FOREIGN KEY (barang_id) 
        REFERENCES public.barang (barang_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ==========================================
-- 4. PEMBUATAN INSERT DATA
-- ==========================================

-- Insert data ke tabel kategori
INSERT INTO public.kategori (kategori_id, kategori_name) VALUES
(1, 'Sayuran'),
(2, 'Minuman'),
(3, 'Bumbu Kering'),
(4, 'Bumbu Basah'),
(5, 'Utama');

-- Insert data ke tabel satuan
INSERT INTO public.satuan (satuan_id, satuan_name) VALUES
(1, 'Kg'),
(2, 'Liter'),
(3, 'Pcs'),
(4, 'Pack'),
(5, 'Botol'),
(6, 'Ekor');

-- Insert data ke tabel toko
INSERT INTO public.toko (toko_id, toko_name) VALUES
(1, 'Cabang Kampung Hutan'),
(2, 'Cabang Bintaro Kesehatan'),
(3, 'Cabang BSD Cordoba');

-- Insert data ke tabel user_role
INSERT INTO public.user_role (ur_id, ur_name) VALUES
(1, 'Admin'),
(2, 'Owner'),
(3, 'Kasir');

-- Insert data ke tabel tempat_simpan
INSERT INTO public.tempat_simpan (ts_id, ts_name) VALUES
(1, 'Freezer'),
(2, 'Kulkas'),
(3, 'Showcase'),
(4, 'Rak/Lemari Kering');

-- Insert data ke tabel user_list
INSERT INTO public.user_list (ul_id, ul_name, ul_password, ur_id) VALUES
(1, 'admin Bella', 'admin@bella', 1),
(2, 'admin 2', 'admin@2', 1),
(3, 'owner 1', 'owner@1', 2),
(4, 'owner 2', 'owner@2', 2),
(5, 'owner 3', 'owner@3', 2),
(6, 'kasir Kampung Hutan', 'kasir@kampunghutan', 3),
(7, 'kasir Bintaro Kesehatan', 'kasir@bintarokesehatan', 3),
(8, 'kasir BSD Cordoba', 'kasir@bsdcordoba', 3);
