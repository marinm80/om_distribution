--
-- PostgreSQL database dump
--

\restrict 0RqvUZW1uJtb3k28Lj1FDU36gzxTVxQ4Bs7bRB7xeLObpLObYnofyncyKbklC35

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg13+2)

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name_en character varying(100) NOT NULL,
    name_es character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50),
    company_name character varying(255),
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contacts_id_seq OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name_en character varying(255) NOT NULL,
    name_es character varying(255) NOT NULL,
    description_en text,
    description_es text,
    image_url text,
    category_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true,
    show_on_landing boolean DEFAULT false
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    token text NOT NULL,
    user_id uuid,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO postgres;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'admin'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name_en, name_es, created_at, updated_at) FROM stdin;
1	Grains	Granos	2026-05-12 13:39:28.437556+00	2026-05-12 13:39:28.437556+00
2	Meat	Carnes	2026-05-12 13:39:28.437556+00	2026-05-12 13:39:28.437556+00
3	Vegetales	Vegetales	2026-05-12 13:39:28.437556+00	2026-05-12 13:39:28.437556+00
4	Packaged Goods	Productos Empacados	2026-05-12 13:39:28.437556+00	2026-05-12 13:39:28.437556+00
5	Chocolates & Confections	Chocolates y Confiter├¡a	2026-05-13 02:20:36.68297+00	2026-05-13 02:20:36.68297+00
6	Crackers & Cookies	Galletas y Crackers	2026-05-13 02:20:36.68757+00	2026-05-13 02:20:36.68757+00
7	Candy & Lollipops	Dulces y Paletas	2026-05-13 02:20:36.689748+00	2026-05-13 02:20:36.689748+00
8	Seasonings & Condiments	Sazones y Condimentos	2026-05-13 02:20:36.69181+00	2026-05-13 02:20:36.69181+00
9	Nutella & Spreads	Nutella y Untables	2026-05-13 02:20:36.693877+00	2026-05-13 02:20:36.693877+00
10	Gummy Candy	Gomitas	2026-05-13 02:20:36.695873+00	2026-05-13 02:20:36.695873+00
11	Cleaning & Auto Care	Limpieza y Cuidado Automotriz	2026-05-13 02:20:36.697963+00	2026-05-13 02:20:36.697963+00
12	Mints & Gum	Mentas y Chicles	2026-05-13 02:20:36.700042+00	2026-05-13 02:20:36.700042+00
13	Traditional Sweets	Dulces Tradicionales	2026-05-13 02:20:36.701911+00	2026-05-13 02:20:36.701911+00
14	Coffee	Caf├⌐	2026-05-13 02:20:36.703747+00	2026-05-13 02:20:36.703747+00
15	Snacks	Snacks	2026-05-13 02:20:36.705895+00	2026-05-13 02:20:36.705895+00
16	Deli & Meats	Embutidos y Carnes	2026-05-13 02:20:36.707783+00	2026-05-13 02:20:36.707783+00
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, full_name, email, phone, company_name, message, created_at) FROM stdin;
1	Euclides Marin Fumero	marinm80@hotmail.com	4137661380	Rocanegras	Quiero comprar nutella.	2026-05-13 03:32:48.926301+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name_en, name_es, description_en, description_es, image_url, category_id, created_at, updated_at, is_active, show_on_landing) FROM stdin;
8	ROCHER 6/T8	ROCHER 6/T8	Ferrero Rocher hazelnut chocolates, pack of 6 units ΓÇö a luxurious bite-sized treat with a whole hazelnut center.	Chocolates Ferrero Rocher con avellana, presentaci├│n de 6 unidades ΓÇö un bocado lujoso con avellana entera en el centro.		5	2026-05-13 02:43:54.4224+00	2026-05-13 03:11:46.512276+00	t	f
9	FERRERO ROCHER	FERRERO ROCHER	Iconic Italian hazelnut chocolate with a crispy wafer shell, creamy filling, and whole roasted hazelnut inside.	Ic├│nico chocolate italiano con avellana, cubierto de una crujiente oblea, relleno cremoso y avellana tostada entera.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
10	ROCHER 12 / T16	ROCHER 12 / T16	Ferrero Rocher hazelnut chocolates, pack of 12 units in display box of 16 ΓÇö perfect for gifting or sharing.	Chocolates Ferrero Rocher con avellana, caja de 12 unidades en display de 16 ΓÇö ideales para regalo o compartir.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
11	ROCHER 6/T24	ROCHER 6/T24	Ferrero Rocher hazelnut chocolates, 6-unit pack in a display of 24 ΓÇö a classic indulgent treat for any occasion.	Chocolates Ferrero Rocher con avellana, presentaci├│n de 6 unidades en display de 24 ΓÇö un cl├ísico placer para cualquier ocasi├│n.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
12	ROCHER COLLECTION T24	ROCHER COLLECTION T24	Ferrero Rocher assorted chocolate collection in a display of 24, featuring a variety of premium chocolate flavors.	Colecci├│n surtida de chocolates Ferrero Rocher en display de 24, con una variedad de sabores premium de chocolate.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
13	MON CHERRI 24/T9	MON CHERRI 24/T9	Ferrero Mon Ch├⌐ri chocolates filled with a whole dark cherry and cherry liqueur, box of 24 units.	Chocolates Ferrero Mon Ch├⌐ri rellenos de cereza entera y licor de cereza, caja de 24 unidades.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
14	MONCHERRI STICK 1/15/T-5	MONCHERRI STICK 1/15/T-5	Mon Ch├⌐ri chocolate stick format with whole dark cherry and liqueur filling, presented in individual packs.	Mon Ch├⌐ri en formato stick con cereza entera y relleno de licor, presentado en empaques individuales.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
15	CRACKERS 100 TO EN BOCA	CRACKERS 100 TO EN BOCA	Crispy bite-sized crackers, a savory and crunchy snack perfect for on-the-go snacking or pairing with dips.	Galletas tipo cracker crujientes en peque├▒os bocados, un snack salado perfecto para llevar o acompa├▒ar con aderezos.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
16	TAINOS	TAINOS	Traditional crunchy crackers with a light, savory flavor ΓÇö a popular everyday snack in Latin households.	Galletas crujientes tradicionales con sabor suave y salado ΓÇö un snack popular en los hogares latinoamericanos.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
17	ROSITAS CRACKERS	ROSITAS CRACKERS	Light and crispy rosita-shaped crackers with a delicate savory taste, perfect as an everyday snack.	Galletas crujientes en forma de rosita con sabor suave y salado, perfectas como snack del d├¡a a d├¡a.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
18	TIC TAC	TIC TAC	Tic Tac small breath-freshening mints ΓÇö iconic tiny candy pellets with a refreshing flavor burst.	Tic Tac pastillas refrescantes peque├▒as para el aliento ΓÇö ic├│nicos caramelos diminutos con un refrescante estallido de sabor.		12	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
19	MENTOS PURE FRESH	MENTOS PURE FRESH	Mentos Pure Fresh sugar-free chewing gum with a long-lasting fresh flavor and smooth texture.	Chicle sin az├║car Mentos Pure Fresh con sabor fresco duradero y textura suave.		12	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
20	TURRON DURO DE ALMENDRA	TURRON DURO DE ALMENDRA	Traditional hard almond nougat ΓÇö a classic Spanish-style turr├│n made with honey, egg whites, and whole almonds.	Turr├│n duro de almendra tradicional ΓÇö un cl├ísico turr├│n estilo espa├▒ol elaborado con miel, claras de huevo y almendras enteras.		13	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
21	RAFFAELLO	RAFFAELLO	Ferrero Raffaello coconut and almond pralines with a delicate wafer shell and smooth coconut cream filling.	Pralin├⌐s Ferrero Raffaello de coco y almendra con delicada oblea y suave relleno de crema de coco.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
22	MILK CHOCOLATE TURKISH COTTON CANDY WITH PISTACHIO	MILK CHOCOLATE TURKISH COTTON CANDY WITH PISTACHIO	Creamy milk chocolate bar filled with pistachio and fluffy cotton candy ΓÇö a unique Turkish-inspired sweet treat.	Barra de chocolate con leche rellena de pistacho y algod├│n de az├║car esponjoso ΓÇö un dulce de inspiraci├│n turca ├║nico.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
23	KITKAT SHARING BLOCKS	KITKAT SHARING BLOCKS	KitKat chocolate sharing size with crispy wafer layers covered in smooth milk chocolate, perfect for sharing.	KitKat en presentaci├│n familiar con capas de oblea crujiente cubierta de chocolate con leche suave, ideal para compartir.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
24	CHOCOLATE BOUNTY	CHOCOLATE BOUNTY	Bounty chocolate bar with a soft coconut filling covered in smooth milk chocolate ΓÇö a tropical classic.	Barra Bounty con relleno suave de coco cubierto de chocolate con leche ΓÇö un cl├ísico de sabor tropical.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
25	KINDER KINDERINI	KINDER KINDERINI	Kinder mini biscuits filled with smooth milk and cocoa cream, a delicious snack for kids and adults.	Mini galletas Kinder rellenas de suave crema de leche y cacao, un delicioso snack para ni├▒os y adultos.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
26	HANUTA 20/T10	HANUTA 20/T10	Hanuta hazelnut wafer sandwich with creamy hazelnut filling, pack of 20 in display of 10.	Oblea Hanuta rellena de crema de avellana, presentaci├│n de 20 unidades en display de 10.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
27	HANUTA RIEGEL	HANUTA RIEGEL	Hanuta hazelnut wafer bar with a rich creamy hazelnut filling, available in individual bar format.	Barra de oblea Hanuta con rico relleno cremoso de avellana, disponible en formato de barra individual.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
28	HANUTA 18 PACKS/BOX	HANUTA 18 PACKS/BOX	Hanuta hazelnut wafer sandwiches, box of 18 packs ΓÇö crunchy wafer layers with smooth hazelnut cream inside.	Obleas Hanuta de avellana, caja de 18 paquetes ΓÇö capas de oblea crujiente con suave crema de avellana.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
29	HANUTA MINIS	HANUTA MINIS	Hanuta mini hazelnut wafer bites ΓÇö the same creamy hazelnut flavor in a fun, bite-sized format.	Mini obleas Hanuta de avellana ΓÇö el mismo sabor cremoso en un formato de bocado divertido y conveniente.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
30	NUTELLA BISCUITS T22X10	NUTELLA BISCUITS T22X10	Nutella Biscuits with crunchy outer cookie layers and a smooth Nutella filling, display of 22 x 10 packs.	Galletas Nutella con capas exteriores crujientes y suave relleno de Nutella, display de 22 x 10 paquetes.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
31	NUTELLA BISCUIT TUBE 166 G X 20 UNIT	NUTELLA BISCUIT TUBE 166 G X 20 UNIT	Nutella Biscuits in a 166g resealable tube ΓÇö crunchy cookies with Nutella filling, great for sharing.	Galletas Nutella en tubo resellable de 166g ΓÇö galletas crujientes con relleno de Nutella, ideales para compartir.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
32	NUTELLA BISCUITS 41.4 G X 28	NUTELLA BISCUITS 41.4 G X 28	Nutella Biscuits 41.4g individual packs ΓÇö perfect on-the-go snack with crispy cookie and hazelnut cocoa filling.	Galletas Nutella de 41.4g en paquetes individuales ΓÇö snack perfecto para llevar con galleta crujiente y relleno de Nutella.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
33	KINDER DELICE	KINDER DELICE	Kinder Delice soft chocolate sponge cake with a smooth milk cream filling, individually wrapped for freshness.	Bizcocho de chocolate Kinder Delice con suave relleno de crema de leche, envuelto individualmente para mayor frescura.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
34	KINDER HAPPY HIPPO HAZELNUT 10 X 5 PK	KINDER HAPPY HIPPO HAZELNUT 10 X 5 PK	Kinder Happy Hippo hazelnut cream-filled biscuits in a fun hippo shape, pack of 10 x 5 units.	Galletas Kinder Happy Hippo rellenas de crema de avellana en divertida forma de hipop├│tamo, caja de 10 x 5 unidades.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
35	KINDER HAPPY HIPPO COCOA 10 X 5PK	KINDER HAPPY HIPPO COCOA 10 X 5PK	Kinder Happy Hippo cocoa cream-filled biscuits in a fun hippo shape, pack of 10 x 5 units.	Galletas Kinder Happy Hippo rellenas de crema de cacao en divertida forma de hipop├│tamo, caja de 10 x 5 unidades.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
36	NUTELLA & GO! X 16 PACK	NUTELLA & GO! X 16 PACK	Nutella & Go! with crispy breadsticks and Nutella hazelnut cocoa spread for dipping ΓÇö a fun and delicious snack.	Nutella & Go! con palitos de pan crujientes y crema de Nutella para untar ΓÇö un snack divertido y delicioso.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
37	NUTELLA 25G X 64 PCS	NUTELLA 25G X 64 PCS	Nutella mini portions of 25g, box of 64 units ΓÇö ideal for individual servings, hotels, cafes, and food service.	Porciones mini de Nutella de 25g, caja de 64 unidades ΓÇö ideales para servicio individual, hoteles, cafeter├¡as y food service.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
38	NUTELLA B-READY T1 X 36	NUTELLA B-READY T1 X 36	Nutella B-ready crispy wafer shell filled with Nutella hazelnut cocoa spread, display of 36 units.	Oblea crujiente Nutella B-ready rellena de crema de avellana y cacao Nutella, display de 36 unidades.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
39	NUTELLA 25G	NUTELLA 25G	Single-serve Nutella 25g portion ΓÇö the iconic hazelnut cocoa spread in a convenient individual serving size.	Porci├│n individual de Nutella 25g ΓÇö la ic├│nica crema de avellana y cacao en un tama├▒o de servicio conveniente.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
40	NUTELLA B-READY T2 44G X 16 PK	NUTELLA B-READY T2 44G X 16 PK	Nutella B-ready wafer with Nutella filling, 44g packs in display of 16 ΓÇö a perfect portable snack.	Oblea Nutella B-ready con relleno de Nutella, paquetes de 44g en display de 16 ΓÇö un snack port├ítil perfecto.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
41	NUTELLA B-READY T6 132G X 16PCS	NUTELLA B-READY T6 132G X 16PCS	Nutella B-ready multipack 132g with 6 wafer pieces per pack, display of 16 ΓÇö ideal for sharing or lunchboxes.	Multipack Nutella B-ready 132g con 6 obleas por paquete, display de 16 ΓÇö ideal para compartir o loncheras.		9	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
42	KINDER BUENO CHOCOLAT 1.5 OZ X 20 PACKS X 2 UNITS	KINDER BUENO CHOCOLAT 1.5 OZ X 20 PACKS X 2 UNITS	Kinder Bueno crispy wafer bars with hazelnut cream filling covered in milk chocolate, 20 packs of 2 units.	Barras Kinder Bueno de oblea crujiente con relleno de crema de avellana cubiertas de chocolate, 20 paquetes de 2 unidades.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
43	KINDER BUENO BLANCO 30 PACKS/BOX	KINDER BUENO BLANCO 30 PACKS/BOX	Kinder Bueno White chocolate wafer bars with hazelnut cream filling covered in smooth white chocolate, box of 30.	Barras Kinder Bueno de chocolate blanco con relleno de avellana cubiertas de suave chocolate blanco, caja de 30.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
44	KINDER BUENO MINI 16X108G	KINDER BUENO MINI 16X108G	Kinder Bueno Mini ΓÇö bite-sized versions of the classic hazelnut cream wafer bar, in resealable sharing bags.	Kinder Bueno Mini ΓÇö versi├│n bocado del cl├ísico wafer de crema de avellana, en bolsas resellables para compartir.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
45	KINDER CARD DISPLAY	KINDER CARD DISPLAY	Kinder assorted chocolate card display ΓÇö a convenient retail display featuring a variety of Kinder products.	Display de tarjetas Kinder surtido ΓÇö exhibidor conveniente con variedad de productos Kinder para punto de venta.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
46	KINDER COUNTRY SINGLES 23.4G X 40	KINDER COUNTRY SINGLES 23.4G X 40	Kinder Country cereal and chocolate bar with crunchy whole grain cereals and creamy milk chocolate coating.	Barra Kinder Country con cereales integrales crujientes y suave cobertura de chocolate con leche.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
47	DUPLO CHOCNUT	DUPLO CHOCNUT	Duplo chocolate and hazelnut wafer bar with layers of crispy wafer, hazelnut cream, and milk chocolate coating.	Barra Duplo de oblea con chocolate y avellana, con capas de oblea crujiente, crema de avellana y cobertura de chocolate.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
48	GALLETA PANKY WAFER 24/9	GALLETA PANKY WAFER 24/9	Panky vanilla cream-filled wafer cookies, pack of 24 ΓÇö a classic wafer beloved across Latin America.	Galletas de oblea Panky con relleno de crema de vainilla, caja de 24 ΓÇö un wafer cl├ísico muy amado en Latinoam├⌐rica.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
49	GALLETA PANKY WAFER 6/30	GALLETA PANKY WAFER 6/30	Panky vanilla cream wafer cookies in a 6-pack display of 30 ΓÇö light, crispy layers with smooth cream filling.	Galletas de oblea Panky con crema de vainilla en display de 6 x 30 ΓÇö capas crujientes con suave relleno cremoso.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
50	GALLETA SUPER 2 NOEL VANILLA 24/24/2	GALLETA SUPER 2 NOEL VANILLA 24/24/2	Noel Super 2 vanilla sandwich cookies with a smooth vanilla cream filling between two crispy cookies.	Galletas s├índwich Noel Super 2 de vainilla con suave relleno de crema de vainilla entre dos galletas crujientes.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
51	GALLETA FAVORITA VANILLA WAFER 12/100G	GALLETA FAVORITA VANILLA WAFER 12/100G	Favorita vanilla wafer cookies ΓÇö light, crispy layers of wafer with delicate vanilla cream, 12 packs of 100g.	Galletas de oblea de vainilla Favorita ΓÇö capas livianas y crujientes con delicada crema de vainilla, 12 paquetes de 100g.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
52	GALLETA BIMBO 2X3 VANILLA 24/10	GALLETA BIMBO 2X3 VANILLA 24/10	Bimbo 2x3 vanilla sandwich cookies with smooth vanilla cream filling ΓÇö a classic everyday snack.	Galletas s├índwich Bimbo 2x3 de vainilla con suave crema de vainilla ΓÇö un cl├ísico snack del d├¡a a d├¡a.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
53	GALLETA BIMBO 2X3 DUPLEX 24/10	GALLETA BIMBO 2X3 DUPLEX 24/10	Bimbo 2x3 Duplex sandwich cookies with chocolate and vanilla cream layers ΓÇö a delicious combination in every bite.	Galletas s├índwich Bimbo 2x3 Duplex con capas de crema de chocolate y vainilla ΓÇö una combinaci├│n deliciosa en cada mordida.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
54	GALLETA BIMBO 2X3 COCO 24/10	GALLETA BIMBO 2X3 COCO 24/10	Bimbo 2x3 coconut sandwich cookies with smooth coconut-flavored cream between crispy cookie layers.	Galletas s├índwich Bimbo 2x3 de coco con suave crema sabor coco entre capas de galleta crujiente.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
55	GALLETA BIMBO 2X3 MANTECADO 24/10	GALLETA BIMBO 2X3 MANTECADO 24/10	Bimbo 2x3 mantecado-flavored shortbread sandwich cookies with a buttery, sweet cream filling.	Galletas s├índwich Bimbo 2x3 sabor mantecado con relleno de crema dulce y mantecosa.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
56	GALLETA BIMBO 2X2 VANILLA 24/10	GALLETA BIMBO 2X2 VANILLA 24/10	Bimbo 2x2 vanilla sandwich cookies ΓÇö two crispy cookies with a smooth vanilla cream center, a classic snack.	Galletas s├índwich Bimbo 2x2 de vainilla ΓÇö dos galletas crujientes con centro de crema de vainilla, un snack cl├ísico.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
57	GALLETA BIMBO 2X2 CHIPS 24/10	GALLETA BIMBO 2X2 CHIPS 24/10	Bimbo 2x2 chocolate chip cookies with crunchy chocolate chips baked into each cookie.	Galletas Bimbo 2x2 con chips de chocolate crujientes horneados en cada galleta.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
58	GALLETA BIMBO 2X2 COCO 24/10	GALLETA BIMBO 2X2 COCO 24/10	Bimbo 2x2 coconut-flavored sandwich cookies with a smooth and aromatic coconut cream filling.	Galletas s├índwich Bimbo 2x2 sabor coco con suave y arom├ítico relleno de crema de coco.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
59	GALLETA BIMBO 2X2 MANTECADO 24/10	GALLETA BIMBO 2X2 MANTECADO 24/10	Bimbo 2x2 mantecado shortbread sandwich cookies ΓÇö buttery, crumbly texture with a classic sweet cream filling.	Galletas s├índwich Bimbo 2x2 sabor mantecado ΓÇö textura mantecosa y desmigable con relleno de crema dulce cl├ísica.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
60	GALLETA 2X2 DUPLEX 24/8 OZ	GALLETA 2X2 DUPLEX 24/8 OZ	Duplex 2x2 sandwich cookies with vanilla and chocolate cream layers ΓÇö a satisfying classic cookie combo.	Galletas s├índwich Duplex 2x2 con capas de crema de vainilla y chocolate ΓÇö una deliciosa combinaci├│n cl├ísica.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
61	GALLETA CAMEO NABISCO 12/13.3 OZ	GALLETA CAMEO NABISCO 12/13.3 OZ	Nabisco Cameo sandwich cookies with a smooth vanilla cream filling between two embossed butter cookies.	Galletas s├índwich Nabisco Cameo con suave relleno de crema de vainilla entre dos galletas de mantequilla estampadas.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
62	CAMEO PEQUENA 4/12/1.9 OZ	CAMEO PEQUENA 4/12/1.9 OZ	Nabisco Cameo small sandwich cookies ΓÇö the classic butter cookie with vanilla cream in a convenient snack size.	Galletas s├índwich Nabisco Cameo peque├▒as ΓÇö la cl├ísica galleta de mantequilla con crema de vainilla en tama├▒o snack.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
63	SERENATA MAXI 15/50 X 1BOX	SERENATA MAXI 15/50 X 1BOX	Serenata Maxi chocolate bar with crunchy peanuts and caramel, a popular Latin American candy classic.	Barra de chocolate Serenata Maxi con man├¡ crujiente y caramelo, un cl├ísico popular de la confiter├¡a latinoamericana.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
64	CHOCOLATE DUBAI 7OZ 200GR	CHOCOLATE DUBAI 7OZ 200GR	Dubai-style pistachio and kataifi chocolate bar ΓÇö rich milk chocolate filled with creamy pistachio and crispy vermicelli.	Chocolate estilo Dubai de pistacho y kataifi ΓÇö chocolate con leche relleno de crema de pistacho y vermicelli crujiente.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
65	KINDER CRISPY	KINDER CRISPY	Kinder Crispy chocolate bar with light, airy wafer layers and smooth milk cream, a lighter take on the classic Kinder.	Barra Kinder Crispy con capas de oblea aireada y suave crema de leche, una versi├│n m├ís ligera del cl├ísico Kinder.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
66	KINDER DELICE	KINDER DELICE	Kinder Delice soft chocolate sponge cake with a smooth milk cream filling, individually wrapped for freshness.	Bizcocho de chocolate Kinder Delice con suave relleno de crema de leche, envuelto individualmente para mayor frescura.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
67	TRONKY 48 PACKS	TRONKY 48 PACKS	Ferrero Tronky hazelnut wafer rolls with smooth hazelnut and cocoa cream filling, display of 48 packs.	Rollos de oblea Ferrero Tronky con suave relleno de crema de avellana y cacao, display de 48 paquetes.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
68	KINDER TRONKY	KINDER TRONKY	Kinder Tronky crispy wafer roll filled with smooth hazelnut cream ΓÇö a light and delicious snack for kids.	Rollo de oblea crujiente Kinder Tronky relleno de suave crema de avellana ΓÇö un snack ligero y delicioso para ni├▒os.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
69	TRONKY T5X20X1	TRONKY T5X20X1	Ferrero Tronky hazelnut wafer rolls, bulk format T5x20x1 ΓÇö light, crispy and filled with hazelnut cream.	Rollos de oblea Ferrero Tronky de avellana, formato a granel T5x20x1 ΓÇö ligeros, crujientes y rellenos de crema de avellana.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
70	NUCITA 18 X 18	NUCITA 18 X 18	Nucita chocolate and hazelnut spread in individual portions, a classic Latin American treat loved by all ages.	Crema de chocolate y avellana Nucita en porciones individuales, un cl├ísico latinoamericano apreciado por todas las edades.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
71	NUCITA WAFER BIG 20G 12 X 24 PCS	NUCITA WAFER BIG 20G 12 X 24 PCS	Nucita Big Wafer with chocolate and hazelnut cream filling ΓÇö a larger, satisfying version of the classic wafer.	Nucita Wafer Grande con relleno de crema de chocolate y avellana ΓÇö una versi├│n m├ís grande y satisfactoria del wafer cl├ísico.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
72	NUCITA ESPARCIBLE 12/350G	NUCITA ESPARCIBLE 12/350G	Nucita hazelnut and cocoa spread in a 350g jar ΓÇö perfect for spreading on bread, waffles, or fruit.	Crema para untar Nucita de avellana y cacao en frasco de 350g ΓÇö perfecta para pan, waffles o frutas.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
73	GALLETAS CUCA CANELA 30/8OZ	GALLETAS CUCA CANELA 30/8OZ	Cucas cinnamon cookies ΓÇö lightly spiced, crispy cinnamon-flavored cookies with a traditional homemade taste.	Galletas Cucas de canela ΓÇö galletas crujientes y ligeramente especiadas con sabor a canela y gusto tradicional casero.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
74	GALLETAS CUCAS JENGIBRE 30/8OZ	GALLETAS CUCAS JENGIBRE 30/8OZ	Cucas ginger cookies ΓÇö crispy and aromatic ginger-spiced cookies inspired by traditional Latin American recipes.	Galletas Cucas de jengibre ΓÇö galletas crujientes y arom├íticas con especias de jengibre de recetas latinoamericanas tradicionales.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
75	CRACKER GALLETAS DE MANTECA 24/6OZ	CRACKER GALLETAS DE MANTECA 24/6OZ	Classic butter crackers ΓÇö light, flaky, and buttery crackers perfect as a snack or paired with cheese and spreads.	Galletas de manteca cl├ísicas ΓÇö crackers ligeras, hojaldradas y mantecosas, perfectas como snack o con queso y untables.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
76	MANTECADITOS/GUAVA 30/8OZ	MANTECADITOS/GUAVA 30/8OZ	Mantecaditos with guava jam ΓÇö traditional Puerto Rican shortbread cookies topped with sweet guava jelly.	Mantecaditos con jalea de guayaba ΓÇö galletas de mantequilla puertorrique├▒as tradicionales con dulce jalea de guayaba.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
77	PINK RINGS LARGE 24/6OZ	PINK RINGS LARGE 24/6OZ	Large pink sugar-glazed ring cookies ΓÇö a classic carnival-style treat with a sweet vanilla flavor and festive look.	Galletas rosadas grandes en forma de argolla glaseadas con az├║car ΓÇö un cl├ísico festivo con sabor dulce a vainilla.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
78	CASCO DE MANTECA 16/8 OZ	CASCO DE MANTECA 16/8 OZ	Casco de manteca shortbread shells ΓÇö traditional crumbly butter pastry shells with a delicate sweet flavor.	Cascos de manteca ΓÇö masas de mantequilla tradicionales, desmigables y con delicado sabor dulce.		6	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
79	Chic-O-Stick	Chic-O-Stick	Chic-O-Stick peanut butter candy stick with a crunchy honeycomb texture and classic sweet peanut butter flavor.	Palito de mantequilla de man├¡ Chic-O-Stick con textura crujiente de panal y sabor dulce cl├ísico a mantequilla de man├¡.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
80	Serenata Display 24 unit	Serenata Display 24 unit	Serenata chocolate bars display with 24 units ΓÇö peanut and caramel chocolate bars, ideal for retail counters.	Display de barras de chocolate Serenata con 24 unidades ΓÇö barras de man├¡ y caramelo, ideales para mostrador de tienda.		5	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
82	YARA TOYS	YARA TOYS	Yara novelty candy toys ΓÇö fun interactive candy experiences combining sweet treats with playful toy elements.	Dulces novedosos Yara ΓÇö divertidas experiencias interactivas que combinan golosinas dulces con elementos de juguete.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
83	MEGA EGG	MEGA EGG	Mega Egg surprise candy ΓÇö a large novelty egg with a sweet candy shell and a surprise toy or candy inside.	Mega Egg de dulce sorpresa ΓÇö un gran huevo novedoso con cubierta de caramelo dulce y juguete o dulce sorpresa dentro.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
84	SLIME LICKER	SLIME LICKER	Slime Licker sour rolling candy ΓÇö an intensely sour liquid candy in a roller bottle, a viral novelty treat.	Slime Licker caramelo l├¡quido enrollable y ├ícido ΓÇö un dulce l├¡quido intensamente ├ícido en botella rodante, sensaci├│n viral.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
85	BOTTLE DIPS	BOTTLE DIPS	Bottle Dips candy ΓÇö a fun novelty candy set with flavored dipping sticks and tangy powder for a sweet-sour experience.	Bottle Dips ΓÇö un divertido set de dulces novedosos con palitos para mojar y polvo ├ícido para una experiencia dulce-├ícida.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
86	YARA VENDING MACHINE	YARA VENDING MACHINE	Yara novelty vending machine candy toy ΓÇö a miniature vending machine dispenser filled with colorful sweet candies.	Dulce novedoso Yara m├íquina expendedora ΓÇö dispensador miniatura estilo m├íquina expendedora lleno de coloridos caramelos.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
87	TWIST & DIP	TWIST & DIP	Twist & Dip novelty candy ΓÇö a twistable lollipop with a tangy dipping powder for a fun dual-flavor experience.	Twist & Dip dulce novedoso ΓÇö paleta giratoria con polvo ├ícido para mojar, una divertida experiencia de doble sabor.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
88	YARA FORTUNE MACHINE	YARA FORTUNE MACHINE	Yara Fortune Machine novelty candy ΓÇö an interactive fortune-telling candy toy dispensing sweet surprises.	Yara Fortune Machine dulce novedoso ΓÇö juguete interactivo de dulces tipo m├íquina de la fortuna con sorpresas dulces.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
89	YARA SPORTS MANIA	YARA SPORTS MANIA	Yara Sports Mania novelty candy ΓÇö sports-themed interactive candy toy with fun collectible elements for kids.	Yara Sports Mania dulce novedoso ΓÇö dulce interactivo tem├ítico deportivo con divertidos elementos coleccionables para ni├▒os.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
90	DOBLON DISPLAY	DOBLON DISPLAY	Doblon novelty candy display ΓÇö a retail display featuring the popular Doblon interactive candy toys.	Display de dulces novedosos Doblon ΓÇö exhibidor para punto de venta con los populares dulces interactivos Doblon.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
91	DOBLON BAG	DOBLON BAG	Doblon novelty candy bag ΓÇö an assortment of fun interactive candy toys packed in a convenient bag.	Bolsa de dulces novedosos Doblon ΓÇö surtido de divertidos dulces interactivos empacados en una bolsa conveniente.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
92	HALLS HONEY LEMON 33.5GM/20CT*1DISPLAY	HALLS HONEY LEMON 33.5GM/20CT*1DISPLAY	Halls Honey Lemon throat drops ΓÇö soothing hard candy lozenges with honey and lemon flavor for throat relief.	Pastillas Halls Miel y Lim├│n ΓÇö caramelos suavizantes para la garganta con sabor a miel y lim├│n para alivio inmediato.		12	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
93	HALLS MENTHOL/COOLWAVE 33.5GM/20CT*1DISPLAY	HALLS MENTHOL/COOLWAVE 33.5GM/20CT*1DISPLAY	Halls Menthol/Coolwave throat drops ΓÇö cooling menthol lozenges for soothing throat and nasal congestion relief.	Pastillas Halls Mentol/Coolwave ΓÇö caramelos mentolados refrescantes para aliviar la garganta y congesti├│n nasal.		12	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
94	LA FE DULCE DE COCO MAMPOSTIAL 12/7OZ	LA FE DULCE DE COCO MAMPOSTIAL 12/7OZ	La Fe dulce de coco mampostial ΓÇö traditional Puerto Rican coconut candy made with shredded coconut and sugar syrup.	Dulce de coco mampostial La Fe ΓÇö dulce tradicional puertorrique├▒o elaborado con coco rallado y alm├¡bar de az├║car.		13	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
95	LA FE PALETA DE ANIS PILONES ROJOS 12/7OZ	LA FE PALETA DE ANIS PILONES ROJOS 12/7OZ	La Fe red anise pilones lollipops ΓÇö traditional sweet hard candy with an authentic anise flavor, beloved by generations.	Pilones rojos de an├¡s La Fe ΓÇö caramelo duro tradicional con aut├⌐ntico sabor a an├¡s, apreciado por generaciones.		13	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
96	DULCES LA FE GOFIO 12/6OZ	DULCES LA FE GOFIO 12/6OZ	La Fe Gofio ΓÇö traditional roasted cornmeal and sugar candy, a nostalgic Latin American sweet treat.	Gofio La Fe ΓÇö dulce tradicional de harina de ma├¡z tostada y az├║car, un nost├ílgico dulce latinoamericano.		13	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
97	CAFE RICO BAG 20/8 OZ	CAFE RICO BAG 20/8 OZ	Caf├⌐ Rico ground coffee, 8 oz bags ΓÇö a rich and aromatic Puerto Rican-style medium roast, box of 20.	Caf├⌐ Rico molido, bolsas de 8 oz ΓÇö un caf├⌐ puertorrique├▒o arom├ítico y rico de tueste medio, caja de 20.		14	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
98	CAFE RICO BAG 10/14 OZ	CAFE RICO BAG 10/14 OZ	Caf├⌐ Rico ground coffee, 14 oz bags ΓÇö full-bodied Puerto Rican coffee with a smooth finish, box of 10.	Caf├⌐ Rico molido, bolsas de 14 oz ΓÇö caf├⌐ puertorrique├▒o de cuerpo completo con un sabor suave y persistente, caja de 10.		14	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
99	CREMA GROUND COFFE 10/14 OZ	CREMA GROUND COFFE 10/14 OZ	Crema ground coffee, 14 oz bags ΓÇö smooth and balanced blend with a creamy finish, box of 10.	Caf├⌐ molido Crema, bolsas de 14 oz ΓÇö mezcla suave y equilibrada con acabado cremoso, caja de 10.		14	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
100	CREMA GROUND COFFE 20/8 OZ	CREMA GROUND COFFE 20/8 OZ	Crema ground coffee, 8 oz bags ΓÇö a smooth, well-balanced coffee blend with a light creamy taste, box of 20.	Caf├⌐ molido Crema, bolsas de 8 oz ΓÇö mezcla de caf├⌐ suave y bien equilibrada con ligero sabor cremoso, caja de 20.		14	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
101	VERO PINTA AZUL	VERO PINTA AZUL	Vero Pinta Azul lollipop ΓÇö a Mexican candy lollipop that stains your tongue blue with a sweet and tangy flavor.	Paleta Vero Pinta Azul ΓÇö paleta mexicana que ti├▒e la lengua de azul con un sabor dulce y ├ícido.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
102	VERO PINTA ROJA	VERO PINTA ROJA	Vero Pinta Roja lollipop ΓÇö a Mexican candy lollipop that stains your tongue red with a sweet and fruity flavor.	Paleta Vero Pinta Roja ΓÇö paleta mexicana que ti├▒e la lengua de rojo con un sabor dulce y afrutado.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
103	PALETA CHARMS CHERRY 12/48	PALETA CHARMS CHERRY 12/48	Charms Cherry lollipops ΓÇö classic sweet cherry-flavored hard candy pops, box of 12 packs of 48 units.	Paletas Charms de cereza ΓÇö cl├ísicas paletas de caramelo duro sabor cereza, caja de 12 paquetes de 48 unidades.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
104	WATERMELON BLOW POP 48 CT X 12 BAGS	WATERMELON BLOW POP 48 CT X 12 BAGS	Blow Pop watermelon lollipops with a sweet watermelon candy shell and bubblegum center, 48 ct x 12 bags.	Paletas Blow Pop sabor sand├¡a con cubierta de caramelo dulce y centro de chicle, 48 unidades x 12 bolsas.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
105	MINT BLOW POP 48 CT X 12 BAGS	MINT BLOW POP 48 CT X 12 BAGS	Blow Pop mint lollipops with a cool refreshing mint hard candy shell and bubblegum center, 48 ct x 12 bags.	Paletas Blow Pop sabor menta con cubierta de caramelo fresco y centro de chicle, 48 unidades x 12 bolsas.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
106	BON BON BUM PALETA SURTIDA 16 BAGS X 48 PCS	BON BON BUM PALETA SURTIDA 16 BAGS X 48 PCS	Bon Bon Bum assorted lollipops with a bubblegum center in a variety of fruit flavors, 16 bags x 48 pieces.	Paletas Bon Bon Bum surtidas con centro de chicle en variedad de sabores frutales, 16 bolsas x 48 unidades.		7	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
107	SNAK MAN CHEEZE BALLS 8 PACKS X 10 BAGS	SNAK MAN CHEEZE BALLS 8 PACKS X 10 BAGS	Snak Man Cheese Balls ΓÇö light, crunchy puffed corn balls with bold cheddar cheese flavor, 8 packs x 10 bags.	Snak Man Bolitas de Queso ΓÇö bolitas de ma├¡z inflado, livianas y crujientes con intenso sabor a queso cheddar, 8 paquetes x 10 bolsas.		15	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
108	SNAK MAN CHEEZE CURLS 8 PACKS X 10 BAGS	SNAK MAN CHEEZE CURLS 8 PACKS X 10 BAGS	Snak Man Cheese Curls ΓÇö crunchy corn curls with a rich, bold cheese flavor coating, 8 packs x 10 bags.	Snak Man Rizos de Queso ΓÇö rizos de ma├¡z crujientes con rica y potente cobertura de sabor a queso, 8 paquetes x 10 bolsas.		15	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
109	CONFETTI STRAWBERRY KISS 12/5.3 OZ	CONFETTI STRAWBERRY KISS 12/5.3 OZ	Confetti Strawberry Kiss gummies ΓÇö soft and chewy strawberry-flavored gummy candies in a convenient tub.	Gomitas Confetti Strawberry Kiss ΓÇö gomitas suaves y masticables sabor fresa en un pr├íctico recipiente.		10	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
110	CONFETTI SOUR BELTS 12/5.3 OZ	CONFETTI SOUR BELTS 12/5.3 OZ	Confetti Sour Belts ΓÇö chewy and intensely sour candy belts in assorted fruit flavors, great for sour candy fans.	Confetti Sour Belts ΓÇö cintas de caramelo masticables e intensamente ├ícidas en sabores frutales surtidos.		10	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
111	CONFETTI SOUR RINGS 12/5.3 OZ	CONFETTI SOUR RINGS 12/5.3 OZ	Confetti Sour Rings ΓÇö chewy gummy rings with a tangy sour coating in assorted fruit flavors.	Confetti Sour Rings ΓÇö anillos de goma masticables con cobertura ├ícida en sabores frutales surtidos.		10	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
112	CONFETTI PIZZA TUB 12/5.3 OZ	CONFETTI PIZZA TUB 12/5.3 OZ	Confetti Pizza gummies ΓÇö fun pizza-shaped gummy candies with fruity flavors in a shareable tub.	Gomitas Confetti Pizza ΓÇö divertidas gomitas en forma de pizza con sabores frutales en un recipiente para compartir.		10	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
113	CONFETTI BEAR TUB 12/5.5 OZ	CONFETTI BEAR TUB 12/5.5 OZ	Confetti Gummy Bears ΓÇö classic soft and chewy gummy bears in assorted fruit flavors, packed in a shareable tub.	Osos de goma Confetti ΓÇö cl├ísicos osos de goma suaves y masticables en sabores frutales surtidos, en recipiente para compartir.		10	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
114	CONFETTI BABY SHARKS 12/7 OZ	CONFETTI BABY SHARKS 12/7 OZ	Confetti Baby Sharks gummies ΓÇö adorable shark-shaped gummy candies in assorted fruit flavors, fun for all ages.	Gomitas Confetti Baby Sharks ΓÇö adorables gomitas en forma de tibur├│n en sabores frutales surtidos, divertidas para todas las edades.		10	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
115	CONFETTI WATERMELON TUB 12/5.5 OZ	CONFETTI WATERMELON TUB 12/5.5 OZ	Confetti Watermelon gummies ΓÇö juicy watermelon-flavored gummy candies in a convenient shareable tub.	Gomitas Confetti de sand├¡a ΓÇö gomitas sabor sand├¡a jugosa en un pr├íctico recipiente para compartir.		10	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
116	UNTOUCHABLE & EVER WET	UNTOUCHABLE & EVER WET	Untouchable & Ever Wet hydrophobic car detailing product ΓÇö provides a long-lasting water-repellent protective coating.	Producto de detallado automotriz hidrof├│bico Untouchable & Ever Wet ΓÇö proporciona una cobertura protectora repelente al agua duradera.		11	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
117	DR. MECANICO SPRAY 6/32 OZ	DR. MECANICO SPRAY 6/32 OZ	Dr. Mec├ínico multi-purpose automotive spray cleaner ΓÇö removes grease, grime, and carbon deposits from engine parts.	Limpiador automotriz en spray multiprop├│sito Dr. Mec├ínico ΓÇö elimina grasa, suciedad y dep├│sitos de carb├│n de piezas del motor.		11	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
118	DR. MECANICO GALLON 4/1 GAL	DR. MECANICO GALLON 4/1 GAL	Dr. Mec├ínico automotive cleaner and degreaser in 1-gallon format ΓÇö professional-grade formula for heavy-duty cleaning.	Limpiador y desengrasante automotriz Dr. Mec├ínico en formato de 1 gal├│n ΓÇö f├│rmula de grado profesional para limpieza pesada.		11	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
119	CRISTAL SACATO ENGINE & MACHINERY 12/32 OZ	CRISTAL SACATO ENGINE & MACHINERY 12/32 OZ	Cristal Sacato engine and machinery degreaser, 32 oz ΓÇö powerful formula that cuts through grease and tough buildup.	Desengrasante de motores y maquinaria Cristal Sacato, 32 oz ΓÇö f├│rmula potente que elimina grasa y suciedad acumulada.		11	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
120	CRISTAL SACATO ENGINE & MACHINERY 5 GALLONS	CRISTAL SACATO ENGINE & MACHINERY 5 GALLONS	Cristal Sacato engine and machinery degreaser, 5-gallon bulk format ΓÇö ideal for workshops and high-volume cleaning.	Desengrasante de motores y maquinaria Cristal Sacato, formato a granel de 5 galones ΓÇö ideal para talleres y limpieza de alto volumen.		11	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
121	UVITA MULTI CLEANER WASH & WAX 6/32 OZ	UVITA MULTI CLEANER WASH & WAX 6/32 OZ	Uvita Multi Cleaner Wash & Wax ΓÇö cleans and shines your vehicle in one step, leaving a protective wax finish.	Uvita Multi Cleaner Wash & Wax ΓÇö limpia y abrillanta tu veh├¡culo en un solo paso, dejando un acabado de cera protector.		11	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
122	UVITA MULTI CLEANER WASH & WAX 4/128 OZ	UVITA MULTI CLEANER WASH & WAX 4/128 OZ	Uvita Multi Cleaner Wash & Wax in 128 oz large format ΓÇö professional-grade car wash and wax solution for fleets.	Uvita Multi Cleaner Wash & Wax en formato grande de 128 oz ΓÇö soluci├│n profesional para lavado y encerado de veh├¡culos.		11	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
123	MORTADELLA DANESANO	MORTADELLA DANESANO	Danesano mortadella ΓÇö premium Italian-style cured pork sausage with delicate spices, smooth texture, and rich flavor.	Mortadela Danesano ΓÇö embutido de cerdo curado estilo italiano premium con delicadas especias, textura suave y rico sabor.		16	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
124	KNORR	KNORR	Knorr seasoning bouillon ΓÇö a versatile all-purpose seasoning that enhances the flavor of soups, stews, rice, and meats.	Sazonador Knorr ΓÇö un condimento vers├ítil todo uso que realza el sabor de sopas, guisos, arroz y carnes.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
125	Sofrito Don Julio 100% natural	Sofrito Don Julio 100% natural	Don Julio 100% natural sofrito ΓÇö authentic Latin seasoning blend made with fresh herbs, peppers, and garlic.	Sofrito 100% natural Don Julio ΓÇö aut├⌐ntica mezcla de condimentos latinos elaborada con hierbas frescas, pimientos y ajo.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
126	DON JULIO SOFRITO VERDE 12/32 OZ	DON JULIO SOFRITO VERDE 12/32 OZ	Don Julio Green Sofrito ΓÇö traditional Latin herb-based cooking sauce with cilantro, culantro, and green peppers.	Sofrito Verde Don Julio ΓÇö salsa de cocina latina tradicional con cilantro, recao y pimientos verdes, 12 x 32 oz.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
127	DON JULIO SOFRITO CON PIMIENTOS ROJOS 12/32 OZ	DON JULIO SOFRITO CON PIMIENTOS ROJOS 12/32 OZ	Don Julio Sofrito with Red Peppers ΓÇö classic Latin cooking base enriched with sweet roasted red peppers for extra flavor.	Sofrito con Pimientos Rojos Don Julio ΓÇö base de cocina latina cl├ísica enriquecida con pimientos rojos asados para mayor sabor.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
128	DON JULIO RECAITO 12/32 OZ	DON JULIO RECAITO 12/32 OZ	Don Julio Recaito ΓÇö traditional cilantro-based cooking sauce essential for authentic Puerto Rican and Caribbean dishes.	Reca├¡to Don Julio ΓÇö salsa de cocina a base de cilantro esencial para platos aut├⌐nticos puertorrique├▒os y caribe├▒os.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
129	DON JULIO SOFRITO CURCUMA 12/32 OZ	DON JULIO SOFRITO CURCUMA 12/32 OZ	Don Julio Turmeric Sofrito ΓÇö a vibrant Latin cooking base blended with golden turmeric for color and anti-inflammatory benefits.	Sofrito con C├║rcuma Don Julio ΓÇö base de cocina latina mezclada con c├║rcuma dorada para color y beneficios antiinflamatorios.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
130	DON JULIO AJO NATURAL 12/32 OZ	DON JULIO AJO NATURAL 12/32 OZ	Don Julio Natural Garlic ΓÇö freshly minced garlic in a jar, ready-to-use and packed with bold, authentic garlic flavor.	Ajo Natural Don Julio ΓÇö ajo finamente picado en frasco, listo para usar y con intenso y aut├⌐ntico sabor a ajo.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
131	DON JULIO AJO PEREJIL 12/32 OZ	DON JULIO AJO PEREJIL 12/32 OZ	Don Julio Garlic with Parsley ΓÇö minced garlic blended with fresh parsley, perfect for enhancing meats, pasta, and sauces.	Ajo con Perejil Don Julio ΓÇö ajo picado mezclado con perejil fresco, perfecto para carnes, pastas y salsas.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
132	DON JULIO AJO CON MANTEQUILLA 12/32 OZ	DON JULIO AJO CON MANTEQUILLA 12/32 OZ	Don Julio Garlic with Butter ΓÇö a rich blend of minced garlic and creamy butter, ideal for garlic bread, seafood, and more.	Ajo con Mantequilla Don Julio ΓÇö mezcla rica de ajo picado y mantequilla cremosa, ideal para pan de ajo, mariscos y m├ís.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
133	DON JULIO AJO CHOPS 12/32 OZ	DON JULIO AJO CHOPS 12/32 OZ	Don Julio Chopped Garlic ΓÇö coarsely chopped garlic in a jar, perfect for adding a rustic garlic bite to any dish.	Ajo Chops Don Julio ΓÇö ajo groseramente picado en frasco, perfecto para a├▒adir un mordisco r├║stico de ajo a cualquier plato.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
134	DON JULIO AJO CON PEREJIL 24/8	DON JULIO AJO CON PEREJIL 24/8	Don Julio Garlic with Parsley ΓÇö minced garlic and fresh parsley blend in convenient 8 oz jars, pack of 24.	Ajo con Perejil Don Julio ΓÇö mezcla de ajo picado y perejil fresco en pr├ícticos frascos de 8 oz, caja de 24.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
135	DON JULIO AJO CHOPS 24/8 OZ	DON JULIO AJO CHOPS 24/8 OZ	Don Julio Chopped Garlic in 8 oz jars, pack of 24 ΓÇö coarsely chopped for a bold, rustic garlic flavor in every bite.	Ajo Chops Don Julio en frascos de 8 oz, caja de 24 ΓÇö picado grueso para un sabor a ajo intenso y r├║stico en cada uso.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
136	DON JULIO AJO NATURAL 24/8 OZ	DON JULIO AJO NATURAL 24/8 OZ	Don Julio Natural Garlic in 8 oz jars, pack of 24 ΓÇö freshly minced garlic ready to use in any savory recipe.	Ajo Natural Don Julio en frascos de 8 oz, caja de 24 ΓÇö ajo reci├⌐n picado listo para usar en cualquier receta salada.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
137	DON JULIO AJO CON MANTEQUILLA 24/8 OZ	DON JULIO AJO CON MANTEQUILLA 24/8 OZ	Don Julio Garlic with Butter in 8 oz jars, pack of 24 ΓÇö a rich garlic-butter blend for breads, pastas, and proteins.	Ajo con Mantequilla Don Julio en frascos de 8 oz, caja de 24 ΓÇö rica mezcla de ajo y mantequilla para panes, pastas y prote├¡nas.		8	2026-05-13 02:43:54.4224+00	2026-05-13 02:43:54.4224+00	t	f
81	Serenata Bag	Serenata Bag	Serenata chocolate mini bites in a resealable bag ΓÇö crunchy peanut and caramel chocolate pieces perfect for sharing.	Mini bocados de chocolate Serenata en bolsa resellable ΓÇö trozos crujientes de man├¡ y caramelo con chocolate, ideales para compartir.	https://m.media-amazon.com/images/I/31otIXUhYQS._SS400_.jpg	5	2026-05-13 02:43:54.4224+00	2026-05-13 03:11:23.35421+00	t	t
140	ROCHER 12 / T16	ROCHER 12 / T16	Ferrero Rocher hazelnut chocolates, pack of 12 units in display box of 16 ΓÇö perfect for gifting or sharing.	Chocolates Ferrero Rocher con avellana, caja de 12 unidades en display de 16 ΓÇö ideales para regalo o compartir.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
141	ROCHER 6/T24	ROCHER 6/T24	Ferrero Rocher hazelnut chocolates, 6-unit pack in a display of 24 ΓÇö a classic indulgent treat for any occasion.	Chocolates Ferrero Rocher con avellana, presentaci├│n de 6 unidades en display de 24 ΓÇö un cl├ísico placer para cualquier ocasi├│n.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
142	ROCHER COLLECTION T24	ROCHER COLLECTION T24	Ferrero Rocher assorted chocolate collection in a display of 24, featuring a variety of premium chocolate flavors.	Colecci├│n surtida de chocolates Ferrero Rocher en display de 24, con una variedad de sabores premium de chocolate.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
143	MON CHERRI 24/T9	MON CHERRI 24/T9	Ferrero Mon Ch├⌐ri chocolates filled with a whole dark cherry and cherry liqueur, box of 24 units.	Chocolates Ferrero Mon Ch├⌐ri rellenos de cereza entera y licor de cereza, caja de 24 unidades.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
144	MONCHERRI STICK 1/15/T-5	MONCHERRI STICK 1/15/T-5	Mon Ch├⌐ri chocolate stick format with whole dark cherry and liqueur filling, presented in individual packs.	Mon Ch├⌐ri en formato stick con cereza entera y relleno de licor, presentado en empaques individuales.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
145	CRACKERS 100 TO EN BOCA	CRACKERS 100 TO EN BOCA	Crispy bite-sized crackers, a savory and crunchy snack perfect for on-the-go snacking or pairing with dips.	Galletas tipo cracker crujientes en peque├▒os bocados, un snack salado perfecto para llevar o acompa├▒ar con aderezos.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
146	TAINOS	TAINOS	Traditional crunchy crackers with a light, savory flavor ΓÇö a popular everyday snack in Latin households.	Galletas crujientes tradicionales con sabor suave y salado ΓÇö un snack popular en los hogares latinoamericanos.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
147	ROSITAS CRACKERS	ROSITAS CRACKERS	Light and crispy rosita-shaped crackers with a delicate savory taste, perfect as an everyday snack.	Galletas crujientes en forma de rosita con sabor suave y salado, perfectas como snack del d├¡a a d├¡a.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
150	TURRON DURO DE ALMENDRA	TURRON DURO DE ALMENDRA	Traditional hard almond nougat ΓÇö a classic Spanish-style turr├│n made with honey, egg whites, and whole almonds.	Turr├│n duro de almendra tradicional ΓÇö un cl├ísico turr├│n estilo espa├▒ol elaborado con miel, claras de huevo y almendras enteras.		13	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
151	RAFFAELLO	RAFFAELLO	Ferrero Raffaello coconut and almond pralines with a delicate wafer shell and smooth coconut cream filling.	Pralin├⌐s Ferrero Raffaello de coco y almendra con delicada oblea y suave relleno de crema de coco.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
152	MILK CHOCOLATE TURKISH COTTON CANDY WITH PISTACHIO	MILK CHOCOLATE TURKISH COTTON CANDY WITH PISTACHIO	Creamy milk chocolate bar filled with pistachio and fluffy cotton candy ΓÇö a unique Turkish-inspired sweet treat.	Barra de chocolate con leche rellena de pistacho y algod├│n de az├║car esponjoso ΓÇö un dulce de inspiraci├│n turca ├║nico.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
154	CHOCOLATE BOUNTY	CHOCOLATE BOUNTY	Bounty chocolate bar with a soft coconut filling covered in smooth milk chocolate ΓÇö a tropical classic.	Barra Bounty con relleno suave de coco cubierto de chocolate con leche ΓÇö un cl├ísico de sabor tropical.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
155	KINDER KINDERINI	KINDER KINDERINI	Kinder mini biscuits filled with smooth milk and cocoa cream, a delicious snack for kids and adults.	Mini galletas Kinder rellenas de suave crema de leche y cacao, un delicioso snack para ni├▒os y adultos.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
156	HANUTA 20/T10	HANUTA 20/T10	Hanuta hazelnut wafer sandwich with creamy hazelnut filling, pack of 20 in display of 10.	Oblea Hanuta rellena de crema de avellana, presentaci├│n de 20 unidades en display de 10.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
157	HANUTA RIEGEL	HANUTA RIEGEL	Hanuta hazelnut wafer bar with a rich creamy hazelnut filling, available in individual bar format.	Barra de oblea Hanuta con rico relleno cremoso de avellana, disponible en formato de barra individual.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
158	HANUTA 18 PACKS/BOX	HANUTA 18 PACKS/BOX	Hanuta hazelnut wafer sandwiches, box of 18 packs ΓÇö crunchy wafer layers with smooth hazelnut cream inside.	Obleas Hanuta de avellana, caja de 18 paquetes ΓÇö capas de oblea crujiente con suave crema de avellana.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
159	HANUTA MINIS	HANUTA MINIS	Hanuta mini hazelnut wafer bites ΓÇö the same creamy hazelnut flavor in a fun, bite-sized format.	Mini obleas Hanuta de avellana ΓÇö el mismo sabor cremoso en un formato de bocado divertido y conveniente.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
160	NUTELLA BISCUITS T22X10	NUTELLA BISCUITS T22X10	Nutella Biscuits with crunchy outer cookie layers and a smooth Nutella filling, display of 22 x 10 packs.	Galletas Nutella con capas exteriores crujientes y suave relleno de Nutella, display de 22 x 10 paquetes.	https://target.scene7.com/is/image/Target/GUEST_52c2e7f2-ba7f-4367-ba9c-ee8498a5c24f	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
149	MENTOS PURE FRESH	MENTOS PURE FRESH	Mentos Pure Fresh sugar-free chewing gum with a long-lasting fresh flavor and smooth texture.	Chicle sin az├║car Mentos Pure Fresh con sabor fresco duradero y textura suave.	https://target.scene7.com/is/image/Target/GUEST_f7f097bc-025d-47fe-b241-74da7e19326a	12	2026-05-15 02:56:54.260543+00	2026-05-15 02:57:32.454372+00	t	t
153	KITKAT SHARING BLOCKS	KITKAT SHARING BLOCKS	KitKat chocolate sharing size with crispy wafer layers covered in smooth milk chocolate, perfect for sharing.	KitKat en presentaci├│n familiar con capas de oblea crujiente cubierta de chocolate con leche suave, ideal para compartir.	https://target.scene7.com/is/image/Target/GUEST_b06c5f90-b90e-42a1-b89f-99d8f2ea17eb	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:57:43.219363+00	t	t
268	ROCHER 6/T8	ROCHER 6/T8	Ferrero Rocher hazelnut chocolates, pack of 6 units ΓÇö a luxurious bite-sized treat with a whole hazelnut center.	Chocolates Ferrero Rocher con avellana, presentaci├│n de 6 unidades ΓÇö un bocado lujoso con avellana entera en el centro.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
139	FERRERO ROCHER	FERRERO ROCHER	Iconic Italian hazelnut chocolate with a crispy wafer shell, creamy filling, and whole roasted hazelnut inside.	Ic├│nico chocolate italiano con avellana, cubierto de una crujiente oblea, relleno cremoso y avellana tostada entera.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 02:56:54.260543+00	2026-05-15 03:17:41.897528+00	t	f
161	NUTELLA BISCUIT TUBE 166 G X 20 UNIT	NUTELLA BISCUIT TUBE 166 G X 20 UNIT	Nutella Biscuits in a 166g resealable tube ΓÇö crunchy cookies with Nutella filling, great for sharing.	Galletas Nutella en tubo resellable de 166g ΓÇö galletas crujientes con relleno de Nutella, ideales para compartir.	https://target.scene7.com/is/image/Target/GUEST_52c2e7f2-ba7f-4367-ba9c-ee8498a5c24f	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
162	NUTELLA BISCUITS 41.4 G X 28	NUTELLA BISCUITS 41.4 G X 28	Nutella Biscuits 41.4g individual packs ΓÇö perfect on-the-go snack with crispy cookie and hazelnut cocoa filling.	Galletas Nutella de 41.4g en paquetes individuales ΓÇö snack perfecto para llevar con galleta crujiente y relleno de Nutella.	https://target.scene7.com/is/image/Target/GUEST_52c2e7f2-ba7f-4367-ba9c-ee8498a5c24f	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
163	KINDER DELICE	KINDER DELICE	Kinder Delice soft chocolate sponge cake with a smooth milk cream filling, individually wrapped for freshness.	Bizcocho de chocolate Kinder Delice con suave relleno de crema de leche, envuelto individualmente para mayor frescura.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
164	KINDER HAPPY HIPPO HAZELNUT 10 X 5 PK	KINDER HAPPY HIPPO HAZELNUT 10 X 5 PK	Kinder Happy Hippo hazelnut cream-filled biscuits in a fun hippo shape, pack of 10 x 5 units.	Galletas Kinder Happy Hippo rellenas de crema de avellana en divertida forma de hipop├│tamo, caja de 10 x 5 unidades.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
165	KINDER HAPPY HIPPO COCOA 10 X 5PK	KINDER HAPPY HIPPO COCOA 10 X 5PK	Kinder Happy Hippo cocoa cream-filled biscuits in a fun hippo shape, pack of 10 x 5 units.	Galletas Kinder Happy Hippo rellenas de crema de cacao en divertida forma de hipop├│tamo, caja de 10 x 5 unidades.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
166	NUTELLA & GO! X 16 PACK	NUTELLA & GO! X 16 PACK	Nutella & Go! with crispy breadsticks and Nutella hazelnut cocoa spread for dipping ΓÇö a fun and delicious snack.	Nutella & Go! con palitos de pan crujientes y crema de Nutella para untar ΓÇö un snack divertido y delicioso.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
167	NUTELLA 25G X 64 PCS	NUTELLA 25G X 64 PCS	Nutella mini portions of 25g, box of 64 units ΓÇö ideal for individual servings, hotels, cafes, and food service.	Porciones mini de Nutella de 25g, caja de 64 unidades ΓÇö ideales para servicio individual, hoteles, cafeter├¡as y food service.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
168	NUTELLA B-READY T1 X 36	NUTELLA B-READY T1 X 36	Nutella B-ready crispy wafer shell filled with Nutella hazelnut cocoa spread, display of 36 units.	Oblea crujiente Nutella B-ready rellena de crema de avellana y cacao Nutella, display de 36 unidades.	https://target.scene7.com/is/image/Target/GUEST_0c9661de-1736-4440-94fc-e888e6d07109	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
169	NUTELLA 25G	NUTELLA 25G	Single-serve Nutella 25g portion ΓÇö the iconic hazelnut cocoa spread in a convenient individual serving size.	Porci├│n individual de Nutella 25g ΓÇö la ic├│nica crema de avellana y cacao en un tama├▒o de servicio conveniente.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
170	NUTELLA B-READY T2 44G X 16 PK	NUTELLA B-READY T2 44G X 16 PK	Nutella B-ready wafer with Nutella filling, 44g packs in display of 16 ΓÇö a perfect portable snack.	Oblea Nutella B-ready con relleno de Nutella, paquetes de 44g en display de 16 ΓÇö un snack port├ítil perfecto.	https://target.scene7.com/is/image/Target/GUEST_0c9661de-1736-4440-94fc-e888e6d07109	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
171	NUTELLA B-READY T6 132G X 16PCS	NUTELLA B-READY T6 132G X 16PCS	Nutella B-ready multipack 132g with 6 wafer pieces per pack, display of 16 ΓÇö ideal for sharing or lunchboxes.	Multipack Nutella B-ready 132g con 6 obleas por paquete, display de 16 ΓÇö ideal para compartir o loncheras.	https://target.scene7.com/is/image/Target/GUEST_0c9661de-1736-4440-94fc-e888e6d07109	9	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
172	KINDER BUENO CHOCOLAT 1.5 OZ X 20 PACKS X 2 UNITS	KINDER BUENO CHOCOLAT 1.5 OZ X 20 PACKS X 2 UNITS	Kinder Bueno crispy wafer bars with hazelnut cream filling covered in milk chocolate, 20 packs of 2 units.	Barras Kinder Bueno de oblea crujiente con relleno de crema de avellana cubiertas de chocolate, 20 paquetes de 2 unidades.	https://target.scene7.com/is/image/Target/GUEST_c3a1078f-01f3-4049-881f-a02f8372ad95	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
173	KINDER BUENO BLANCO 30 PACKS/BOX	KINDER BUENO BLANCO 30 PACKS/BOX	Kinder Bueno White chocolate wafer bars with hazelnut cream filling covered in smooth white chocolate, box of 30.	Barras Kinder Bueno de chocolate blanco con relleno de avellana cubiertas de suave chocolate blanco, caja de 30.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
174	KINDER BUENO MINI 16X108G	KINDER BUENO MINI 16X108G	Kinder Bueno Mini ΓÇö bite-sized versions of the classic hazelnut cream wafer bar, in resealable sharing bags.	Kinder Bueno Mini ΓÇö versi├│n bocado del cl├ísico wafer de crema de avellana, en bolsas resellables para compartir.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
175	KINDER CARD DISPLAY	KINDER CARD DISPLAY	Kinder assorted chocolate card display ΓÇö a convenient retail display featuring a variety of Kinder products.	Display de tarjetas Kinder surtido ΓÇö exhibidor conveniente con variedad de productos Kinder para punto de venta.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
176	KINDER COUNTRY SINGLES 23.4G X 40	KINDER COUNTRY SINGLES 23.4G X 40	Kinder Country cereal and chocolate bar with crunchy whole grain cereals and creamy milk chocolate coating.	Barra Kinder Country con cereales integrales crujientes y suave cobertura de chocolate con leche.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
177	DUPLO CHOCNUT	DUPLO CHOCNUT	Duplo chocolate and hazelnut wafer bar with layers of crispy wafer, hazelnut cream, and milk chocolate coating.	Barra Duplo de oblea con chocolate y avellana, con capas de oblea crujiente, crema de avellana y cobertura de chocolate.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
178	GALLETA PANKY WAFER 24/9	GALLETA PANKY WAFER 24/9	Panky vanilla cream-filled wafer cookies, pack of 24 ΓÇö a classic wafer beloved across Latin America.	Galletas de oblea Panky con relleno de crema de vainilla, caja de 24 ΓÇö un wafer cl├ísico muy amado en Latinoam├⌐rica.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
179	GALLETA PANKY WAFER 6/30	GALLETA PANKY WAFER 6/30	Panky vanilla cream wafer cookies in a 6-pack display of 30 ΓÇö light, crispy layers with smooth cream filling.	Galletas de oblea Panky con crema de vainilla en display de 6 x 30 ΓÇö capas crujientes con suave relleno cremoso.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
180	GALLETA SUPER 2 NOEL VANILLA 24/24/2	GALLETA SUPER 2 NOEL VANILLA 24/24/2	Noel Super 2 vanilla sandwich cookies with a smooth vanilla cream filling between two crispy cookies.	Galletas s├índwich Noel Super 2 de vainilla con suave relleno de crema de vainilla entre dos galletas crujientes.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
181	GALLETA FAVORITA VANILLA WAFER 12/100G	GALLETA FAVORITA VANILLA WAFER 12/100G	Favorita vanilla wafer cookies ΓÇö light, crispy layers of wafer with delicate vanilla cream, 12 packs of 100g.	Galletas de oblea de vainilla Favorita ΓÇö capas livianas y crujientes con delicada crema de vainilla, 12 paquetes de 100g.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
182	GALLETA BIMBO 2X3 VANILLA 24/10	GALLETA BIMBO 2X3 VANILLA 24/10	Bimbo 2x3 vanilla sandwich cookies with smooth vanilla cream filling ΓÇö a classic everyday snack.	Galletas s├índwich Bimbo 2x3 de vainilla con suave crema de vainilla ΓÇö un cl├ísico snack del d├¡a a d├¡a.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
183	GALLETA BIMBO 2X3 DUPLEX 24/10	GALLETA BIMBO 2X3 DUPLEX 24/10	Bimbo 2x3 Duplex sandwich cookies with chocolate and vanilla cream layers ΓÇö a delicious combination in every bite.	Galletas s├índwich Bimbo 2x3 Duplex con capas de crema de chocolate y vainilla ΓÇö una combinaci├│n deliciosa en cada mordida.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
184	GALLETA BIMBO 2X3 COCO 24/10	GALLETA BIMBO 2X3 COCO 24/10	Bimbo 2x3 coconut sandwich cookies with smooth coconut-flavored cream between crispy cookie layers.	Galletas s├índwich Bimbo 2x3 de coco con suave crema sabor coco entre capas de galleta crujiente.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
185	GALLETA BIMBO 2X3 MANTECADO 24/10	GALLETA BIMBO 2X3 MANTECADO 24/10	Bimbo 2x3 mantecado-flavored shortbread sandwich cookies with a buttery, sweet cream filling.	Galletas s├índwich Bimbo 2x3 sabor mantecado con relleno de crema dulce y mantecosa.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
186	GALLETA BIMBO 2X2 VANILLA 24/10	GALLETA BIMBO 2X2 VANILLA 24/10	Bimbo 2x2 vanilla sandwich cookies ΓÇö two crispy cookies with a smooth vanilla cream center, a classic snack.	Galletas s├índwich Bimbo 2x2 de vainilla ΓÇö dos galletas crujientes con centro de crema de vainilla, un snack cl├ísico.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
187	GALLETA BIMBO 2X2 CHIPS 24/10	GALLETA BIMBO 2X2 CHIPS 24/10	Bimbo 2x2 chocolate chip cookies with crunchy chocolate chips baked into each cookie.	Galletas Bimbo 2x2 con chips de chocolate crujientes horneados en cada galleta.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
188	GALLETA BIMBO 2X2 COCO 24/10	GALLETA BIMBO 2X2 COCO 24/10	Bimbo 2x2 coconut-flavored sandwich cookies with a smooth and aromatic coconut cream filling.	Galletas s├índwich Bimbo 2x2 sabor coco con suave y arom├ítico relleno de crema de coco.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
189	GALLETA BIMBO 2X2 MANTECADO 24/10	GALLETA BIMBO 2X2 MANTECADO 24/10	Bimbo 2x2 mantecado shortbread sandwich cookies ΓÇö buttery, crumbly texture with a classic sweet cream filling.	Galletas s├índwich Bimbo 2x2 sabor mantecado ΓÇö textura mantecosa y desmigable con relleno de crema dulce cl├ísica.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
190	GALLETA 2X2 DUPLEX 24/8 OZ	GALLETA 2X2 DUPLEX 24/8 OZ	Duplex 2x2 sandwich cookies with vanilla and chocolate cream layers ΓÇö a satisfying classic cookie combo.	Galletas s├índwich Duplex 2x2 con capas de crema de vainilla y chocolate ΓÇö una deliciosa combinaci├│n cl├ísica.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
191	GALLETA CAMEO NABISCO 12/13.3 OZ	GALLETA CAMEO NABISCO 12/13.3 OZ	Nabisco Cameo sandwich cookies with a smooth vanilla cream filling between two embossed butter cookies.	Galletas s├índwich Nabisco Cameo con suave relleno de crema de vainilla entre dos galletas de mantequilla estampadas.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
192	CAMEO PEQUENA 4/12/1.9 OZ	CAMEO PEQUENA 4/12/1.9 OZ	Nabisco Cameo small sandwich cookies ΓÇö the classic butter cookie with vanilla cream in a convenient snack size.	Galletas s├índwich Nabisco Cameo peque├▒as ΓÇö la cl├ísica galleta de mantequilla con crema de vainilla en tama├▒o snack.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
193	SERENATA MAXI 15/50 X 1BOX	SERENATA MAXI 15/50 X 1BOX	Serenata Maxi chocolate bar with crunchy peanuts and caramel, a popular Latin American candy classic.	Barra de chocolate Serenata Maxi con man├¡ crujiente y caramelo, un cl├ísico popular de la confiter├¡a latinoamericana.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
194	CHOCOLATE DUBAI 7OZ 200GR	CHOCOLATE DUBAI 7OZ 200GR	Dubai-style pistachio and kataifi chocolate bar ΓÇö rich milk chocolate filled with creamy pistachio and crispy vermicelli.	Chocolate estilo Dubai de pistacho y kataifi ΓÇö chocolate con leche relleno de crema de pistacho y vermicelli crujiente.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
195	KINDER CRISPY	KINDER CRISPY	Kinder Crispy chocolate bar with light, airy wafer layers and smooth milk cream, a lighter take on the classic Kinder.	Barra Kinder Crispy con capas de oblea aireada y suave crema de leche, una versi├│n m├ís ligera del cl├ísico Kinder.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
196	KINDER DELICE	KINDER DELICE	Kinder Delice soft chocolate sponge cake with a smooth milk cream filling, individually wrapped for freshness.	Bizcocho de chocolate Kinder Delice con suave relleno de crema de leche, envuelto individualmente para mayor frescura.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
197	TRONKY 48 PACKS	TRONKY 48 PACKS	Ferrero Tronky hazelnut wafer rolls with smooth hazelnut and cocoa cream filling, display of 48 packs.	Rollos de oblea Ferrero Tronky con suave relleno de crema de avellana y cacao, display de 48 paquetes.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
198	KINDER TRONKY	KINDER TRONKY	Kinder Tronky crispy wafer roll filled with smooth hazelnut cream ΓÇö a light and delicious snack for kids.	Rollo de oblea crujiente Kinder Tronky relleno de suave crema de avellana ΓÇö un snack ligero y delicioso para ni├▒os.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
199	TRONKY T5X20X1	TRONKY T5X20X1	Ferrero Tronky hazelnut wafer rolls, bulk format T5x20x1 ΓÇö light, crispy and filled with hazelnut cream.	Rollos de oblea Ferrero Tronky de avellana, formato a granel T5x20x1 ΓÇö ligeros, crujientes y rellenos de crema de avellana.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
200	NUCITA 18 X 18	NUCITA 18 X 18	Nucita chocolate and hazelnut spread in individual portions, a classic Latin American treat loved by all ages.	Crema de chocolate y avellana Nucita en porciones individuales, un cl├ísico latinoamericano apreciado por todas las edades.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
201	NUCITA WAFER BIG 20G 12 X 24 PCS	NUCITA WAFER BIG 20G 12 X 24 PCS	Nucita Big Wafer with chocolate and hazelnut cream filling ΓÇö a larger, satisfying version of the classic wafer.	Nucita Wafer Grande con relleno de crema de chocolate y avellana ΓÇö una versi├│n m├ís grande y satisfactoria del wafer cl├ísico.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
202	NUCITA ESPARCIBLE 12/350G	NUCITA ESPARCIBLE 12/350G	Nucita hazelnut and cocoa spread in a 350g jar ΓÇö perfect for spreading on bread, waffles, or fruit.	Crema para untar Nucita de avellana y cacao en frasco de 350g ΓÇö perfecta para pan, waffles o frutas.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
203	GALLETAS CUCA CANELA 30/8OZ	GALLETAS CUCA CANELA 30/8OZ	Cucas cinnamon cookies ΓÇö lightly spiced, crispy cinnamon-flavored cookies with a traditional homemade taste.	Galletas Cucas de canela ΓÇö galletas crujientes y ligeramente especiadas con sabor a canela y gusto tradicional casero.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
204	GALLETAS CUCAS JENGIBRE 30/8OZ	GALLETAS CUCAS JENGIBRE 30/8OZ	Cucas ginger cookies ΓÇö crispy and aromatic ginger-spiced cookies inspired by traditional Latin American recipes.	Galletas Cucas de jengibre ΓÇö galletas crujientes y arom├íticas con especias de jengibre de recetas latinoamericanas tradicionales.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
205	CRACKER GALLETAS DE MANTECA 24/6OZ	CRACKER GALLETAS DE MANTECA 24/6OZ	Classic butter crackers ΓÇö light, flaky, and buttery crackers perfect as a snack or paired with cheese and spreads.	Galletas de manteca cl├ísicas ΓÇö crackers ligeras, hojaldradas y mantecosas, perfectas como snack o con queso y untables.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
206	MANTECADITOS/GUAVA 30/8OZ	MANTECADITOS/GUAVA 30/8OZ	Mantecaditos with guava jam ΓÇö traditional Puerto Rican shortbread cookies topped with sweet guava jelly.	Mantecaditos con jalea de guayaba ΓÇö galletas de mantequilla puertorrique├▒as tradicionales con dulce jalea de guayaba.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
207	PINK RINGS LARGE 24/6OZ	PINK RINGS LARGE 24/6OZ	Large pink sugar-glazed ring cookies ΓÇö a classic carnival-style treat with a sweet vanilla flavor and festive look.	Galletas rosadas grandes en forma de argolla glaseadas con az├║car ΓÇö un cl├ísico festivo con sabor dulce a vainilla.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
208	CASCO DE MANTECA 16/8 OZ	CASCO DE MANTECA 16/8 OZ	Casco de manteca shortbread shells ΓÇö traditional crumbly butter pastry shells with a delicate sweet flavor.	Cascos de manteca ΓÇö masas de mantequilla tradicionales, desmigables y con delicado sabor dulce.		6	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
209	Chic-O-Stick	Chic-O-Stick	Chic-O-Stick peanut butter candy stick with a crunchy honeycomb texture and classic sweet peanut butter flavor.	Palito de mantequilla de man├¡ Chic-O-Stick con textura crujiente de panal y sabor dulce cl├ísico a mantequilla de man├¡.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
210	Serenata Display 24 unit	Serenata Display 24 unit	Serenata chocolate bars display with 24 units ΓÇö peanut and caramel chocolate bars, ideal for retail counters.	Display de barras de chocolate Serenata con 24 unidades ΓÇö barras de man├¡ y caramelo, ideales para mostrador de tienda.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
211	Serenata Bag	Serenata Bag	Serenata chocolate mini bites in a resealable bag ΓÇö crunchy peanut and caramel chocolate pieces perfect for sharing.	Mini bocados de chocolate Serenata en bolsa resellable ΓÇö trozos crujientes de man├¡ y caramelo con chocolate, ideales para compartir.		5	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
212	YARA TOYS	YARA TOYS	Yara novelty candy toys ΓÇö fun interactive candy experiences combining sweet treats with playful toy elements.	Dulces novedosos Yara ΓÇö divertidas experiencias interactivas que combinan golosinas dulces con elementos de juguete.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
213	MEGA EGG	MEGA EGG	Mega Egg surprise candy ΓÇö a large novelty egg with a sweet candy shell and a surprise toy or candy inside.	Mega Egg de dulce sorpresa ΓÇö un gran huevo novedoso con cubierta de caramelo dulce y juguete o dulce sorpresa dentro.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
214	SLIME LICKER	SLIME LICKER	Slime Licker sour rolling candy ΓÇö an intensely sour liquid candy in a roller bottle, a viral novelty treat.	Slime Licker caramelo l├¡quido enrollable y ├ícido ΓÇö un dulce l├¡quido intensamente ├ícido en botella rodante, sensaci├│n viral.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
215	BOTTLE DIPS	BOTTLE DIPS	Bottle Dips candy ΓÇö a fun novelty candy set with flavored dipping sticks and tangy powder for a sweet-sour experience.	Bottle Dips ΓÇö un divertido set de dulces novedosos con palitos para mojar y polvo ├ícido para una experiencia dulce-├ícida.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
216	YARA VENDING MACHINE	YARA VENDING MACHINE	Yara novelty vending machine candy toy ΓÇö a miniature vending machine dispenser filled with colorful sweet candies.	Dulce novedoso Yara m├íquina expendedora ΓÇö dispensador miniatura estilo m├íquina expendedora lleno de coloridos caramelos.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
217	TWIST & DIP	TWIST & DIP	Twist & Dip novelty candy ΓÇö a twistable lollipop with a tangy dipping powder for a fun dual-flavor experience.	Twist & Dip dulce novedoso ΓÇö paleta giratoria con polvo ├ícido para mojar, una divertida experiencia de doble sabor.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
218	YARA FORTUNE MACHINE	YARA FORTUNE MACHINE	Yara Fortune Machine novelty candy ΓÇö an interactive fortune-telling candy toy dispensing sweet surprises.	Yara Fortune Machine dulce novedoso ΓÇö juguete interactivo de dulces tipo m├íquina de la fortuna con sorpresas dulces.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
219	YARA SPORTS MANIA	YARA SPORTS MANIA	Yara Sports Mania novelty candy ΓÇö sports-themed interactive candy toy with fun collectible elements for kids.	Yara Sports Mania dulce novedoso ΓÇö dulce interactivo tem├ítico deportivo con divertidos elementos coleccionables para ni├▒os.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
220	DOBLON DISPLAY	DOBLON DISPLAY	Doblon novelty candy display ΓÇö a retail display featuring the popular Doblon interactive candy toys.	Display de dulces novedosos Doblon ΓÇö exhibidor para punto de venta con los populares dulces interactivos Doblon.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
221	DOBLON BAG	DOBLON BAG	Doblon novelty candy bag ΓÇö an assortment of fun interactive candy toys packed in a convenient bag.	Bolsa de dulces novedosos Doblon ΓÇö surtido de divertidos dulces interactivos empacados en una bolsa conveniente.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
222	HALLS HONEY LEMON 33.5GM/20CT*1DISPLAY	HALLS HONEY LEMON 33.5GM/20CT*1DISPLAY	Halls Honey Lemon throat drops ΓÇö soothing hard candy lozenges with honey and lemon flavor for throat relief.	Pastillas Halls Miel y Lim├│n ΓÇö caramelos suavizantes para la garganta con sabor a miel y lim├│n para alivio inmediato.	https://target.scene7.com/is/image/Target/GUEST_47e70961-e0c0-411e-9219-46e377c5dc08	12	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
223	HALLS MENTHOL/COOLWAVE 33.5GM/20CT*1DISPLAY	HALLS MENTHOL/COOLWAVE 33.5GM/20CT*1DISPLAY	Halls Menthol/Coolwave throat drops ΓÇö cooling menthol lozenges for soothing throat and nasal congestion relief.	Pastillas Halls Mentol/Coolwave ΓÇö caramelos mentolados refrescantes para aliviar la garganta y congesti├│n nasal.	https://target.scene7.com/is/image/Target/GUEST_47e70961-e0c0-411e-9219-46e377c5dc08	12	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
224	LA FE DULCE DE COCO MAMPOSTIAL 12/7OZ	LA FE DULCE DE COCO MAMPOSTIAL 12/7OZ	La Fe dulce de coco mampostial ΓÇö traditional Puerto Rican coconut candy made with shredded coconut and sugar syrup.	Dulce de coco mampostial La Fe ΓÇö dulce tradicional puertorrique├▒o elaborado con coco rallado y alm├¡bar de az├║car.		13	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
225	LA FE PALETA DE ANIS PILONES ROJOS 12/7OZ	LA FE PALETA DE ANIS PILONES ROJOS 12/7OZ	La Fe red anise pilones lollipops ΓÇö traditional sweet hard candy with an authentic anise flavor, beloved by generations.	Pilones rojos de an├¡s La Fe ΓÇö caramelo duro tradicional con aut├⌐ntico sabor a an├¡s, apreciado por generaciones.		13	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
226	DULCES LA FE GOFIO 12/6OZ	DULCES LA FE GOFIO 12/6OZ	La Fe Gofio ΓÇö traditional roasted cornmeal and sugar candy, a nostalgic Latin American sweet treat.	Gofio La Fe ΓÇö dulce tradicional de harina de ma├¡z tostada y az├║car, un nost├ílgico dulce latinoamericano.		13	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
227	CAFE RICO BAG 20/8 OZ	CAFE RICO BAG 20/8 OZ	Caf├⌐ Rico ground coffee, 8 oz bags ΓÇö a rich and aromatic Puerto Rican-style medium roast, box of 20.	Caf├⌐ Rico molido, bolsas de 8 oz ΓÇö un caf├⌐ puertorrique├▒o arom├ítico y rico de tueste medio, caja de 20.		14	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
228	CAFE RICO BAG 10/14 OZ	CAFE RICO BAG 10/14 OZ	Caf├⌐ Rico ground coffee, 14 oz bags ΓÇö full-bodied Puerto Rican coffee with a smooth finish, box of 10.	Caf├⌐ Rico molido, bolsas de 14 oz ΓÇö caf├⌐ puertorrique├▒o de cuerpo completo con un sabor suave y persistente, caja de 10.		14	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
229	CREMA GROUND COFFE 10/14 OZ	CREMA GROUND COFFE 10/14 OZ	Crema ground coffee, 14 oz bags ΓÇö smooth and balanced blend with a creamy finish, box of 10.	Caf├⌐ molido Crema, bolsas de 14 oz ΓÇö mezcla suave y equilibrada con acabado cremoso, caja de 10.		14	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
230	CREMA GROUND COFFE 20/8 OZ	CREMA GROUND COFFE 20/8 OZ	Crema ground coffee, 8 oz bags ΓÇö a smooth, well-balanced coffee blend with a light creamy taste, box of 20.	Caf├⌐ molido Crema, bolsas de 8 oz ΓÇö mezcla de caf├⌐ suave y bien equilibrada con ligero sabor cremoso, caja de 20.		14	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
231	VERO PINTA AZUL	VERO PINTA AZUL	Vero Pinta Azul lollipop ΓÇö a Mexican candy lollipop that stains your tongue blue with a sweet and tangy flavor.	Paleta Vero Pinta Azul ΓÇö paleta mexicana que ti├▒e la lengua de azul con un sabor dulce y ├ícido.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
232	VERO PINTA ROJA	VERO PINTA ROJA	Vero Pinta Roja lollipop ΓÇö a Mexican candy lollipop that stains your tongue red with a sweet and fruity flavor.	Paleta Vero Pinta Roja ΓÇö paleta mexicana que ti├▒e la lengua de rojo con un sabor dulce y afrutado.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
233	PALETA CHARMS CHERRY 12/48	PALETA CHARMS CHERRY 12/48	Charms Cherry lollipops ΓÇö classic sweet cherry-flavored hard candy pops, box of 12 packs of 48 units.	Paletas Charms de cereza ΓÇö cl├ísicas paletas de caramelo duro sabor cereza, caja de 12 paquetes de 48 unidades.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
234	WATERMELON BLOW POP 48 CT X 12 BAGS	WATERMELON BLOW POP 48 CT X 12 BAGS	Blow Pop watermelon lollipops with a sweet watermelon candy shell and bubblegum center, 48 ct x 12 bags.	Paletas Blow Pop sabor sand├¡a con cubierta de caramelo dulce y centro de chicle, 48 unidades x 12 bolsas.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
235	MINT BLOW POP 48 CT X 12 BAGS	MINT BLOW POP 48 CT X 12 BAGS	Blow Pop mint lollipops with a cool refreshing mint hard candy shell and bubblegum center, 48 ct x 12 bags.	Paletas Blow Pop sabor menta con cubierta de caramelo fresco y centro de chicle, 48 unidades x 12 bolsas.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
236	BON BON BUM PALETA SURTIDA 16 BAGS X 48 PCS	BON BON BUM PALETA SURTIDA 16 BAGS X 48 PCS	Bon Bon Bum assorted lollipops with a bubblegum center in a variety of fruit flavors, 16 bags x 48 pieces.	Paletas Bon Bon Bum surtidas con centro de chicle en variedad de sabores frutales, 16 bolsas x 48 unidades.		7	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
237	SNAK MAN CHEEZE BALLS 8 PACKS X 10 BAGS	SNAK MAN CHEEZE BALLS 8 PACKS X 10 BAGS	Snak Man Cheese Balls ΓÇö light, crunchy puffed corn balls with bold cheddar cheese flavor, 8 packs x 10 bags.	Snak Man Bolitas de Queso ΓÇö bolitas de ma├¡z inflado, livianas y crujientes con intenso sabor a queso cheddar, 8 paquetes x 10 bolsas.		15	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
238	SNAK MAN CHEEZE CURLS 8 PACKS X 10 BAGS	SNAK MAN CHEEZE CURLS 8 PACKS X 10 BAGS	Snak Man Cheese Curls ΓÇö crunchy corn curls with a rich, bold cheese flavor coating, 8 packs x 10 bags.	Snak Man Rizos de Queso ΓÇö rizos de ma├¡z crujientes con rica y potente cobertura de sabor a queso, 8 paquetes x 10 bolsas.		15	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
239	CONFETTI STRAWBERRY KISS 12/5.3 OZ	CONFETTI STRAWBERRY KISS 12/5.3 OZ	Confetti Strawberry Kiss gummies ΓÇö soft and chewy strawberry-flavored gummy candies in a convenient tub.	Gomitas Confetti Strawberry Kiss ΓÇö gomitas suaves y masticables sabor fresa en un pr├íctico recipiente.		10	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
240	CONFETTI SOUR BELTS 12/5.3 OZ	CONFETTI SOUR BELTS 12/5.3 OZ	Confetti Sour Belts ΓÇö chewy and intensely sour candy belts in assorted fruit flavors, great for sour candy fans.	Confetti Sour Belts ΓÇö cintas de caramelo masticables e intensamente ├ícidas en sabores frutales surtidos.		10	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
241	CONFETTI SOUR RINGS 12/5.3 OZ	CONFETTI SOUR RINGS 12/5.3 OZ	Confetti Sour Rings ΓÇö chewy gummy rings with a tangy sour coating in assorted fruit flavors.	Confetti Sour Rings ΓÇö anillos de goma masticables con cobertura ├ícida en sabores frutales surtidos.		10	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
242	CONFETTI PIZZA TUB 12/5.3 OZ	CONFETTI PIZZA TUB 12/5.3 OZ	Confetti Pizza gummies ΓÇö fun pizza-shaped gummy candies with fruity flavors in a shareable tub.	Gomitas Confetti Pizza ΓÇö divertidas gomitas en forma de pizza con sabores frutales en un recipiente para compartir.		10	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
243	CONFETTI BEAR TUB 12/5.5 OZ	CONFETTI BEAR TUB 12/5.5 OZ	Confetti Gummy Bears ΓÇö classic soft and chewy gummy bears in assorted fruit flavors, packed in a shareable tub.	Osos de goma Confetti ΓÇö cl├ísicos osos de goma suaves y masticables en sabores frutales surtidos, en recipiente para compartir.		10	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
244	CONFETTI BABY SHARKS 12/7 OZ	CONFETTI BABY SHARKS 12/7 OZ	Confetti Baby Sharks gummies ΓÇö adorable shark-shaped gummy candies in assorted fruit flavors, fun for all ages.	Gomitas Confetti Baby Sharks ΓÇö adorables gomitas en forma de tibur├│n en sabores frutales surtidos, divertidas para todas las edades.		10	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
245	CONFETTI WATERMELON TUB 12/5.5 OZ	CONFETTI WATERMELON TUB 12/5.5 OZ	Confetti Watermelon gummies ΓÇö juicy watermelon-flavored gummy candies in a convenient shareable tub.	Gomitas Confetti de sand├¡a ΓÇö gomitas sabor sand├¡a jugosa en un pr├íctico recipiente para compartir.		10	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
246	UNTOUCHABLE & EVER WET	UNTOUCHABLE & EVER WET	Untouchable & Ever Wet hydrophobic car detailing product ΓÇö provides a long-lasting water-repellent protective coating.	Producto de detallado automotriz hidrof├│bico Untouchable & Ever Wet ΓÇö proporciona una cobertura protectora repelente al agua duradera.		11	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
247	DR. MECANICO SPRAY 6/32 OZ	DR. MECANICO SPRAY 6/32 OZ	Dr. Mec├ínico multi-purpose automotive spray cleaner ΓÇö removes grease, grime, and carbon deposits from engine parts.	Limpiador automotriz en spray multiprop├│sito Dr. Mec├ínico ΓÇö elimina grasa, suciedad y dep├│sitos de carb├│n de piezas del motor.		11	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
248	DR. MECANICO GALLON 4/1 GAL	DR. MECANICO GALLON 4/1 GAL	Dr. Mec├ínico automotive cleaner and degreaser in 1-gallon format ΓÇö professional-grade formula for heavy-duty cleaning.	Limpiador y desengrasante automotriz Dr. Mec├ínico en formato de 1 gal├│n ΓÇö f├│rmula de grado profesional para limpieza pesada.		11	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
249	CRISTAL SACATO ENGINE & MACHINERY 12/32 OZ	CRISTAL SACATO ENGINE & MACHINERY 12/32 OZ	Cristal Sacato engine and machinery degreaser, 32 oz ΓÇö powerful formula that cuts through grease and tough buildup.	Desengrasante de motores y maquinaria Cristal Sacato, 32 oz ΓÇö f├│rmula potente que elimina grasa y suciedad acumulada.		11	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
250	CRISTAL SACATO ENGINE & MACHINERY 5 GALLONS	CRISTAL SACATO ENGINE & MACHINERY 5 GALLONS	Cristal Sacato engine and machinery degreaser, 5-gallon bulk format ΓÇö ideal for workshops and high-volume cleaning.	Desengrasante de motores y maquinaria Cristal Sacato, formato a granel de 5 galones ΓÇö ideal para talleres y limpieza de alto volumen.		11	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
251	UVITA MULTI CLEANER WASH & WAX 6/32 OZ	UVITA MULTI CLEANER WASH & WAX 6/32 OZ	Uvita Multi Cleaner Wash & Wax ΓÇö cleans and shines your vehicle in one step, leaving a protective wax finish.	Uvita Multi Cleaner Wash & Wax ΓÇö limpia y abrillanta tu veh├¡culo en un solo paso, dejando un acabado de cera protector.		11	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
252	UVITA MULTI CLEANER WASH & WAX 4/128 OZ	UVITA MULTI CLEANER WASH & WAX 4/128 OZ	Uvita Multi Cleaner Wash & Wax in 128 oz large format ΓÇö professional-grade car wash and wax solution for fleets.	Uvita Multi Cleaner Wash & Wax en formato grande de 128 oz ΓÇö soluci├│n profesional para lavado y encerado de veh├¡culos.		11	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
253	MORTADELLA DANESANO	MORTADELLA DANESANO	Danesano mortadella ΓÇö premium Italian-style cured pork sausage with delicate spices, smooth texture, and rich flavor.	Mortadela Danesano ΓÇö embutido de cerdo curado estilo italiano premium con delicadas especias, textura suave y rico sabor.		16	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
254	KNORR	KNORR	Knorr seasoning bouillon ΓÇö a versatile all-purpose seasoning that enhances the flavor of soups, stews, rice, and meats.	Sazonador Knorr ΓÇö un condimento vers├ítil todo uso que realza el sabor de sopas, guisos, arroz y carnes.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
255	Sofrito Don Julio 100% natural	Sofrito Don Julio 100% natural	Don Julio 100% natural sofrito ΓÇö authentic Latin seasoning blend made with fresh herbs, peppers, and garlic.	Sofrito 100% natural Don Julio ΓÇö aut├⌐ntica mezcla de condimentos latinos elaborada con hierbas frescas, pimientos y ajo.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
256	DON JULIO SOFRITO VERDE 12/32 OZ	DON JULIO SOFRITO VERDE 12/32 OZ	Don Julio Green Sofrito ΓÇö traditional Latin herb-based cooking sauce with cilantro, culantro, and green peppers.	Sofrito Verde Don Julio ΓÇö salsa de cocina latina tradicional con cilantro, recao y pimientos verdes, 12 x 32 oz.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
257	DON JULIO SOFRITO CON PIMIENTOS ROJOS 12/32 OZ	DON JULIO SOFRITO CON PIMIENTOS ROJOS 12/32 OZ	Don Julio Sofrito with Red Peppers ΓÇö classic Latin cooking base enriched with sweet roasted red peppers for extra flavor.	Sofrito con Pimientos Rojos Don Julio ΓÇö base de cocina latina cl├ísica enriquecida con pimientos rojos asados para mayor sabor.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
258	DON JULIO RECAITO 12/32 OZ	DON JULIO RECAITO 12/32 OZ	Don Julio Recaito ΓÇö traditional cilantro-based cooking sauce essential for authentic Puerto Rican and Caribbean dishes.	Reca├¡to Don Julio ΓÇö salsa de cocina a base de cilantro esencial para platos aut├⌐nticos puertorrique├▒os y caribe├▒os.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
259	DON JULIO SOFRITO CURCUMA 12/32 OZ	DON JULIO SOFRITO CURCUMA 12/32 OZ	Don Julio Turmeric Sofrito ΓÇö a vibrant Latin cooking base blended with golden turmeric for color and anti-inflammatory benefits.	Sofrito con C├║rcuma Don Julio ΓÇö base de cocina latina mezclada con c├║rcuma dorada para color y beneficios antiinflamatorios.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
260	DON JULIO AJO NATURAL 12/32 OZ	DON JULIO AJO NATURAL 12/32 OZ	Don Julio Natural Garlic ΓÇö freshly minced garlic in a jar, ready-to-use and packed with bold, authentic garlic flavor.	Ajo Natural Don Julio ΓÇö ajo finamente picado en frasco, listo para usar y con intenso y aut├⌐ntico sabor a ajo.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
261	DON JULIO AJO PEREJIL 12/32 OZ	DON JULIO AJO PEREJIL 12/32 OZ	Don Julio Garlic with Parsley ΓÇö minced garlic blended with fresh parsley, perfect for enhancing meats, pasta, and sauces.	Ajo con Perejil Don Julio ΓÇö ajo picado mezclado con perejil fresco, perfecto para carnes, pastas y salsas.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
262	DON JULIO AJO CON MANTEQUILLA 12/32 OZ	DON JULIO AJO CON MANTEQUILLA 12/32 OZ	Don Julio Garlic with Butter ΓÇö a rich blend of minced garlic and creamy butter, ideal for garlic bread, seafood, and more.	Ajo con Mantequilla Don Julio ΓÇö mezcla rica de ajo picado y mantequilla cremosa, ideal para pan de ajo, mariscos y m├ís.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
263	DON JULIO AJO CHOPS 12/32 OZ	DON JULIO AJO CHOPS 12/32 OZ	Don Julio Chopped Garlic ΓÇö coarsely chopped garlic in a jar, perfect for adding a rustic garlic bite to any dish.	Ajo Chops Don Julio ΓÇö ajo groseramente picado en frasco, perfecto para a├▒adir un mordisco r├║stico de ajo a cualquier plato.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
264	DON JULIO AJO CON PEREJIL 24/8	DON JULIO AJO CON PEREJIL 24/8	Don Julio Garlic with Parsley ΓÇö minced garlic and fresh parsley blend in convenient 8 oz jars, pack of 24.	Ajo con Perejil Don Julio ΓÇö mezcla de ajo picado y perejil fresco en pr├ícticos frascos de 8 oz, caja de 24.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
265	DON JULIO AJO CHOPS 24/8 OZ	DON JULIO AJO CHOPS 24/8 OZ	Don Julio Chopped Garlic in 8 oz jars, pack of 24 ΓÇö coarsely chopped for a bold, rustic garlic flavor in every bite.	Ajo Chops Don Julio en frascos de 8 oz, caja de 24 ΓÇö picado grueso para un sabor a ajo intenso y r├║stico en cada uso.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
266	DON JULIO AJO NATURAL 24/8 OZ	DON JULIO AJO NATURAL 24/8 OZ	Don Julio Natural Garlic in 8 oz jars, pack of 24 ΓÇö freshly minced garlic ready to use in any savory recipe.	Ajo Natural Don Julio en frascos de 8 oz, caja de 24 ΓÇö ajo reci├⌐n picado listo para usar en cualquier receta salada.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
267	DON JULIO AJO CON MANTEQUILLA 24/8 OZ	DON JULIO AJO CON MANTEQUILLA 24/8 OZ	Don Julio Garlic with Butter in 8 oz jars, pack of 24 ΓÇö a rich garlic-butter blend for breads, pastas, and proteins.	Ajo con Mantequilla Don Julio en frascos de 8 oz, caja de 24 ΓÇö rica mezcla de ajo y mantequilla para panes, pastas y prote├¡nas.		8	2026-05-15 02:56:54.260543+00	2026-05-15 02:56:54.260543+00	t	f
138	ROCHER 6/T8	ROCHER 6/T8	Ferrero Rocher hazelnut chocolates, pack of 6 units ΓÇö a luxurious bite-sized treat with a whole hazelnut center.	Chocolates Ferrero Rocher con avellana, presentaci├│n de 6 unidades ΓÇö un bocado lujoso con avellana entera en el centro.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 02:56:54.260543+00	2026-05-15 02:57:24.020133+00	t	t
148	TIC TAC	TIC TAC	Tic Tac small breath-freshening mints ΓÇö iconic tiny candy pellets with a refreshing flavor burst.	Tic Tac pastillas refrescantes peque├▒as para el aliento ΓÇö ic├│nicos caramelos diminutos con un refrescante estallido de sabor.	https://target.scene7.com/is/image/Target/GUEST_3621f974-d4b7-4c11-8178-29da2a79546b	12	2026-05-15 02:56:54.260543+00	2026-05-15 02:57:31.021492+00	t	t
269	FERRERO ROCHER	FERRERO ROCHER	Iconic Italian hazelnut chocolate with a crispy wafer shell, creamy filling, and whole roasted hazelnut inside.	Ic├│nico chocolate italiano con avellana, cubierto de una crujiente oblea, relleno cremoso y avellana tostada entera.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
270	ROCHER 12 / T16	ROCHER 12 / T16	Ferrero Rocher hazelnut chocolates, pack of 12 units in display box of 16 ΓÇö perfect for gifting or sharing.	Chocolates Ferrero Rocher con avellana, caja de 12 unidades en display de 16 ΓÇö ideales para regalo o compartir.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
271	ROCHER 6/T24	ROCHER 6/T24	Ferrero Rocher hazelnut chocolates, 6-unit pack in a display of 24 ΓÇö a classic indulgent treat for any occasion.	Chocolates Ferrero Rocher con avellana, presentaci├│n de 6 unidades en display de 24 ΓÇö un cl├ísico placer para cualquier ocasi├│n.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
272	ROCHER COLLECTION T24	ROCHER COLLECTION T24	Ferrero Rocher assorted chocolate collection in a display of 24, featuring a variety of premium chocolate flavors.	Colecci├│n surtida de chocolates Ferrero Rocher en display de 24, con una variedad de sabores premium de chocolate.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
273	MON CHERRI 24/T9	MON CHERRI 24/T9	Ferrero Mon Ch├⌐ri chocolates filled with a whole dark cherry and cherry liqueur, box of 24 units.	Chocolates Ferrero Mon Ch├⌐ri rellenos de cereza entera y licor de cereza, caja de 24 unidades.	https://target.scene7.com/is/image/Target/GUEST_f848ca32-fb96-472f-9740-27642b12f887	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
274	MONCHERRI STICK 1/15/T-5	MONCHERRI STICK 1/15/T-5	Mon Ch├⌐ri chocolate stick format with whole dark cherry and liqueur filling, presented in individual packs.	Mon Ch├⌐ri en formato stick con cereza entera y relleno de licor, presentado en empaques individuales.	https://target.scene7.com/is/image/Target/GUEST_f848ca32-fb96-472f-9740-27642b12f887	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
275	CRACKERS 100 TO EN BOCA	CRACKERS 100 TO EN BOCA	Crispy bite-sized crackers, a savory and crunchy snack perfect for on-the-go snacking or pairing with dips.	Galletas tipo cracker crujientes en peque├▒os bocados, un snack salado perfecto para llevar o acompa├▒ar con aderezos.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
276	TAINOS	TAINOS	Traditional crunchy crackers with a light, savory flavor ΓÇö a popular everyday snack in Latin households.	Galletas crujientes tradicionales con sabor suave y salado ΓÇö un snack popular en los hogares latinoamericanos.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
277	ROSITAS CRACKERS	ROSITAS CRACKERS	Light and crispy rosita-shaped crackers with a delicate savory taste, perfect as an everyday snack.	Galletas crujientes en forma de rosita con sabor suave y salado, perfectas como snack del d├¡a a d├¡a.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
278	TIC TAC	TIC TAC	Tic Tac small breath-freshening mints ΓÇö iconic tiny candy pellets with a refreshing flavor burst.	Tic Tac pastillas refrescantes peque├▒as para el aliento ΓÇö ic├│nicos caramelos diminutos con un refrescante estallido de sabor.	https://target.scene7.com/is/image/Target/GUEST_3621f974-d4b7-4c11-8178-29da2a79546b	12	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
279	MENTOS PURE FRESH	MENTOS PURE FRESH	Mentos Pure Fresh sugar-free chewing gum with a long-lasting fresh flavor and smooth texture.	Chicle sin az├║car Mentos Pure Fresh con sabor fresco duradero y textura suave.	https://target.scene7.com/is/image/Target/GUEST_f7f097bc-025d-47fe-b241-74da7e19326a	12	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
280	TURRON DURO DE ALMENDRA	TURRON DURO DE ALMENDRA	Traditional hard almond nougat ΓÇö a classic Spanish-style turr├│n made with honey, egg whites, and whole almonds.	Turr├│n duro de almendra tradicional ΓÇö un cl├ísico turr├│n estilo espa├▒ol elaborado con miel, claras de huevo y almendras enteras.		13	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
281	RAFFAELLO	RAFFAELLO	Ferrero Raffaello coconut and almond pralines with a delicate wafer shell and smooth coconut cream filling.	Pralin├⌐s Ferrero Raffaello de coco y almendra con delicada oblea y suave relleno de crema de coco.	https://target.scene7.com/is/image/Target/GUEST_b294fd9e-fec0-4a18-9f8e-4bf33e2dab9e	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
282	MILK CHOCOLATE TURKISH COTTON CANDY WITH PISTACHIO	MILK CHOCOLATE TURKISH COTTON CANDY WITH PISTACHIO	Creamy milk chocolate bar filled with pistachio and fluffy cotton candy ΓÇö a unique Turkish-inspired sweet treat.	Barra de chocolate con leche rellena de pistacho y algod├│n de az├║car esponjoso ΓÇö un dulce de inspiraci├│n turca ├║nico.		5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
283	KITKAT SHARING BLOCKS	KITKAT SHARING BLOCKS	KitKat chocolate sharing size with crispy wafer layers covered in smooth milk chocolate, perfect for sharing.	KitKat en presentaci├│n familiar con capas de oblea crujiente cubierta de chocolate con leche suave, ideal para compartir.	https://target.scene7.com/is/image/Target/GUEST_b06c5f90-b90e-42a1-b89f-99d8f2ea17eb	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
284	CHOCOLATE BOUNTY	CHOCOLATE BOUNTY	Bounty chocolate bar with a soft coconut filling covered in smooth milk chocolate ΓÇö a tropical classic.	Barra Bounty con relleno suave de coco cubierto de chocolate con leche ΓÇö un cl├ísico de sabor tropical.	https://target.scene7.com/is/image/Target/GUEST_b06c5f90-b90e-42a1-b89f-99d8f2ea17eb	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
285	KINDER KINDERINI	KINDER KINDERINI	Kinder mini biscuits filled with smooth milk and cocoa cream, a delicious snack for kids and adults.	Mini galletas Kinder rellenas de suave crema de leche y cacao, un delicioso snack para ni├▒os y adultos.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
286	HANUTA 20/T10	HANUTA 20/T10	Hanuta hazelnut wafer sandwich with creamy hazelnut filling, pack of 20 in display of 10.	Oblea Hanuta rellena de crema de avellana, presentaci├│n de 20 unidades en display de 10.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
287	HANUTA RIEGEL	HANUTA RIEGEL	Hanuta hazelnut wafer bar with a rich creamy hazelnut filling, available in individual bar format.	Barra de oblea Hanuta con rico relleno cremoso de avellana, disponible en formato de barra individual.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
288	HANUTA 18 PACKS/BOX	HANUTA 18 PACKS/BOX	Hanuta hazelnut wafer sandwiches, box of 18 packs ΓÇö crunchy wafer layers with smooth hazelnut cream inside.	Obleas Hanuta de avellana, caja de 18 paquetes ΓÇö capas de oblea crujiente con suave crema de avellana.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
289	HANUTA MINIS	HANUTA MINIS	Hanuta mini hazelnut wafer bites ΓÇö the same creamy hazelnut flavor in a fun, bite-sized format.	Mini obleas Hanuta de avellana ΓÇö el mismo sabor cremoso en un formato de bocado divertido y conveniente.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
290	NUTELLA BISCUITS T22X10	NUTELLA BISCUITS T22X10	Nutella Biscuits with crunchy outer cookie layers and a smooth Nutella filling, display of 22 x 10 packs.	Galletas Nutella con capas exteriores crujientes y suave relleno de Nutella, display de 22 x 10 paquetes.	https://target.scene7.com/is/image/Target/GUEST_52c2e7f2-ba7f-4367-ba9c-ee8498a5c24f	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
291	NUTELLA BISCUIT TUBE 166 G X 20 UNIT	NUTELLA BISCUIT TUBE 166 G X 20 UNIT	Nutella Biscuits in a 166g resealable tube ΓÇö crunchy cookies with Nutella filling, great for sharing.	Galletas Nutella en tubo resellable de 166g ΓÇö galletas crujientes con relleno de Nutella, ideales para compartir.	https://target.scene7.com/is/image/Target/GUEST_52c2e7f2-ba7f-4367-ba9c-ee8498a5c24f	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
292	NUTELLA BISCUITS 41.4 G X 28	NUTELLA BISCUITS 41.4 G X 28	Nutella Biscuits 41.4g individual packs ΓÇö perfect on-the-go snack with crispy cookie and hazelnut cocoa filling.	Galletas Nutella de 41.4g en paquetes individuales ΓÇö snack perfecto para llevar con galleta crujiente y relleno de Nutella.	https://target.scene7.com/is/image/Target/GUEST_52c2e7f2-ba7f-4367-ba9c-ee8498a5c24f	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
293	KINDER DELICE	KINDER DELICE	Kinder Delice soft chocolate sponge cake with a smooth milk cream filling, individually wrapped for freshness.	Bizcocho de chocolate Kinder Delice con suave relleno de crema de leche, envuelto individualmente para mayor frescura.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
294	KINDER HAPPY HIPPO HAZELNUT 10 X 5 PK	KINDER HAPPY HIPPO HAZELNUT 10 X 5 PK	Kinder Happy Hippo hazelnut cream-filled biscuits in a fun hippo shape, pack of 10 x 5 units.	Galletas Kinder Happy Hippo rellenas de crema de avellana en divertida forma de hipop├│tamo, caja de 10 x 5 unidades.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
295	KINDER HAPPY HIPPO COCOA 10 X 5PK	KINDER HAPPY HIPPO COCOA 10 X 5PK	Kinder Happy Hippo cocoa cream-filled biscuits in a fun hippo shape, pack of 10 x 5 units.	Galletas Kinder Happy Hippo rellenas de crema de cacao en divertida forma de hipop├│tamo, caja de 10 x 5 unidades.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
296	NUTELLA & GO! X 16 PACK	NUTELLA & GO! X 16 PACK	Nutella & Go! with crispy breadsticks and Nutella hazelnut cocoa spread for dipping ΓÇö a fun and delicious snack.	Nutella & Go! con palitos de pan crujientes y crema de Nutella para untar ΓÇö un snack divertido y delicioso.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
297	NUTELLA 25G X 64 PCS	NUTELLA 25G X 64 PCS	Nutella mini portions of 25g, box of 64 units ΓÇö ideal for individual servings, hotels, cafes, and food service.	Porciones mini de Nutella de 25g, caja de 64 unidades ΓÇö ideales para servicio individual, hoteles, cafeter├¡as y food service.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
298	NUTELLA B-READY T1 X 36	NUTELLA B-READY T1 X 36	Nutella B-ready crispy wafer shell filled with Nutella hazelnut cocoa spread, display of 36 units.	Oblea crujiente Nutella B-ready rellena de crema de avellana y cacao Nutella, display de 36 unidades.	https://target.scene7.com/is/image/Target/GUEST_0c9661de-1736-4440-94fc-e888e6d07109	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
299	NUTELLA 25G	NUTELLA 25G	Single-serve Nutella 25g portion ΓÇö the iconic hazelnut cocoa spread in a convenient individual serving size.	Porci├│n individual de Nutella 25g ΓÇö la ic├│nica crema de avellana y cacao en un tama├▒o de servicio conveniente.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
300	NUTELLA B-READY T2 44G X 16 PK	NUTELLA B-READY T2 44G X 16 PK	Nutella B-ready wafer with Nutella filling, 44g packs in display of 16 ΓÇö a perfect portable snack.	Oblea Nutella B-ready con relleno de Nutella, paquetes de 44g en display de 16 ΓÇö un snack port├ítil perfecto.	https://target.scene7.com/is/image/Target/GUEST_0c9661de-1736-4440-94fc-e888e6d07109	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
301	NUTELLA B-READY T6 132G X 16PCS	NUTELLA B-READY T6 132G X 16PCS	Nutella B-ready multipack 132g with 6 wafer pieces per pack, display of 16 ΓÇö ideal for sharing or lunchboxes.	Multipack Nutella B-ready 132g con 6 obleas por paquete, display de 16 ΓÇö ideal para compartir o loncheras.	https://target.scene7.com/is/image/Target/GUEST_0c9661de-1736-4440-94fc-e888e6d07109	9	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
302	KINDER BUENO CHOCOLAT 1.5 OZ X 20 PACKS X 2 UNITS	KINDER BUENO CHOCOLAT 1.5 OZ X 20 PACKS X 2 UNITS	Kinder Bueno crispy wafer bars with hazelnut cream filling covered in milk chocolate, 20 packs of 2 units.	Barras Kinder Bueno de oblea crujiente con relleno de crema de avellana cubiertas de chocolate, 20 paquetes de 2 unidades.	https://target.scene7.com/is/image/Target/GUEST_c3a1078f-01f3-4049-881f-a02f8372ad95	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
303	KINDER BUENO BLANCO 30 PACKS/BOX	KINDER BUENO BLANCO 30 PACKS/BOX	Kinder Bueno White chocolate wafer bars with hazelnut cream filling covered in smooth white chocolate, box of 30.	Barras Kinder Bueno de chocolate blanco con relleno de avellana cubiertas de suave chocolate blanco, caja de 30.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
304	KINDER BUENO MINI 16X108G	KINDER BUENO MINI 16X108G	Kinder Bueno Mini ΓÇö bite-sized versions of the classic hazelnut cream wafer bar, in resealable sharing bags.	Kinder Bueno Mini ΓÇö versi├│n bocado del cl├ísico wafer de crema de avellana, en bolsas resellables para compartir.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
305	KINDER CARD DISPLAY	KINDER CARD DISPLAY	Kinder assorted chocolate card display ΓÇö a convenient retail display featuring a variety of Kinder products.	Display de tarjetas Kinder surtido ΓÇö exhibidor conveniente con variedad de productos Kinder para punto de venta.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
306	KINDER COUNTRY SINGLES 23.4G X 40	KINDER COUNTRY SINGLES 23.4G X 40	Kinder Country cereal and chocolate bar with crunchy whole grain cereals and creamy milk chocolate coating.	Barra Kinder Country con cereales integrales crujientes y suave cobertura de chocolate con leche.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
307	DUPLO CHOCNUT	DUPLO CHOCNUT	Duplo chocolate and hazelnut wafer bar with layers of crispy wafer, hazelnut cream, and milk chocolate coating.	Barra Duplo de oblea con chocolate y avellana, con capas de oblea crujiente, crema de avellana y cobertura de chocolate.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
308	GALLETA PANKY WAFER 24/9	GALLETA PANKY WAFER 24/9	Panky vanilla cream-filled wafer cookies, pack of 24 ΓÇö a classic wafer beloved across Latin America.	Galletas de oblea Panky con relleno de crema de vainilla, caja de 24 ΓÇö un wafer cl├ísico muy amado en Latinoam├⌐rica.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
309	GALLETA PANKY WAFER 6/30	GALLETA PANKY WAFER 6/30	Panky vanilla cream wafer cookies in a 6-pack display of 30 ΓÇö light, crispy layers with smooth cream filling.	Galletas de oblea Panky con crema de vainilla en display de 6 x 30 ΓÇö capas crujientes con suave relleno cremoso.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
310	GALLETA SUPER 2 NOEL VANILLA 24/24/2	GALLETA SUPER 2 NOEL VANILLA 24/24/2	Noel Super 2 vanilla sandwich cookies with a smooth vanilla cream filling between two crispy cookies.	Galletas s├índwich Noel Super 2 de vainilla con suave relleno de crema de vainilla entre dos galletas crujientes.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
311	GALLETA FAVORITA VANILLA WAFER 12/100G	GALLETA FAVORITA VANILLA WAFER 12/100G	Favorita vanilla wafer cookies ΓÇö light, crispy layers of wafer with delicate vanilla cream, 12 packs of 100g.	Galletas de oblea de vainilla Favorita ΓÇö capas livianas y crujientes con delicada crema de vainilla, 12 paquetes de 100g.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
312	GALLETA BIMBO 2X3 VANILLA 24/10	GALLETA BIMBO 2X3 VANILLA 24/10	Bimbo 2x3 vanilla sandwich cookies with smooth vanilla cream filling ΓÇö a classic everyday snack.	Galletas s├índwich Bimbo 2x3 de vainilla con suave crema de vainilla ΓÇö un cl├ísico snack del d├¡a a d├¡a.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
313	GALLETA BIMBO 2X3 DUPLEX 24/10	GALLETA BIMBO 2X3 DUPLEX 24/10	Bimbo 2x3 Duplex sandwich cookies with chocolate and vanilla cream layers ΓÇö a delicious combination in every bite.	Galletas s├índwich Bimbo 2x3 Duplex con capas de crema de chocolate y vainilla ΓÇö una combinaci├│n deliciosa en cada mordida.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
314	GALLETA BIMBO 2X3 COCO 24/10	GALLETA BIMBO 2X3 COCO 24/10	Bimbo 2x3 coconut sandwich cookies with smooth coconut-flavored cream between crispy cookie layers.	Galletas s├índwich Bimbo 2x3 de coco con suave crema sabor coco entre capas de galleta crujiente.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
315	GALLETA BIMBO 2X3 MANTECADO 24/10	GALLETA BIMBO 2X3 MANTECADO 24/10	Bimbo 2x3 mantecado-flavored shortbread sandwich cookies with a buttery, sweet cream filling.	Galletas s├índwich Bimbo 2x3 sabor mantecado con relleno de crema dulce y mantecosa.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
316	GALLETA BIMBO 2X2 VANILLA 24/10	GALLETA BIMBO 2X2 VANILLA 24/10	Bimbo 2x2 vanilla sandwich cookies ΓÇö two crispy cookies with a smooth vanilla cream center, a classic snack.	Galletas s├índwich Bimbo 2x2 de vainilla ΓÇö dos galletas crujientes con centro de crema de vainilla, un snack cl├ísico.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
317	GALLETA BIMBO 2X2 CHIPS 24/10	GALLETA BIMBO 2X2 CHIPS 24/10	Bimbo 2x2 chocolate chip cookies with crunchy chocolate chips baked into each cookie.	Galletas Bimbo 2x2 con chips de chocolate crujientes horneados en cada galleta.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
318	GALLETA BIMBO 2X2 COCO 24/10	GALLETA BIMBO 2X2 COCO 24/10	Bimbo 2x2 coconut-flavored sandwich cookies with a smooth and aromatic coconut cream filling.	Galletas s├índwich Bimbo 2x2 sabor coco con suave y arom├ítico relleno de crema de coco.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
319	GALLETA BIMBO 2X2 MANTECADO 24/10	GALLETA BIMBO 2X2 MANTECADO 24/10	Bimbo 2x2 mantecado shortbread sandwich cookies ΓÇö buttery, crumbly texture with a classic sweet cream filling.	Galletas s├índwich Bimbo 2x2 sabor mantecado ΓÇö textura mantecosa y desmigable con relleno de crema dulce cl├ísica.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
320	GALLETA 2X2 DUPLEX 24/8 OZ	GALLETA 2X2 DUPLEX 24/8 OZ	Duplex 2x2 sandwich cookies with vanilla and chocolate cream layers ΓÇö a satisfying classic cookie combo.	Galletas s├índwich Duplex 2x2 con capas de crema de vainilla y chocolate ΓÇö una deliciosa combinaci├│n cl├ísica.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
321	GALLETA CAMEO NABISCO 12/13.3 OZ	GALLETA CAMEO NABISCO 12/13.3 OZ	Nabisco Cameo sandwich cookies with a smooth vanilla cream filling between two embossed butter cookies.	Galletas s├índwich Nabisco Cameo con suave relleno de crema de vainilla entre dos galletas de mantequilla estampadas.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
322	CAMEO PEQUENA 4/12/1.9 OZ	CAMEO PEQUENA 4/12/1.9 OZ	Nabisco Cameo small sandwich cookies ΓÇö the classic butter cookie with vanilla cream in a convenient snack size.	Galletas s├índwich Nabisco Cameo peque├▒as ΓÇö la cl├ísica galleta de mantequilla con crema de vainilla en tama├▒o snack.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
323	SERENATA MAXI 15/50 X 1BOX	SERENATA MAXI 15/50 X 1BOX	Serenata Maxi chocolate bar with crunchy peanuts and caramel, a popular Latin American candy classic.	Barra de chocolate Serenata Maxi con man├¡ crujiente y caramelo, un cl├ísico popular de la confiter├¡a latinoamericana.	https://target.scene7.com/is/image/Target/GUEST_b06c5f90-b90e-42a1-b89f-99d8f2ea17eb	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
324	CHOCOLATE DUBAI 7OZ 200GR	CHOCOLATE DUBAI 7OZ 200GR	Dubai-style pistachio and kataifi chocolate bar ΓÇö rich milk chocolate filled with creamy pistachio and crispy vermicelli.	Chocolate estilo Dubai de pistacho y kataifi ΓÇö chocolate con leche relleno de crema de pistacho y vermicelli crujiente.		5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
325	KINDER CRISPY	KINDER CRISPY	Kinder Crispy chocolate bar with light, airy wafer layers and smooth milk cream, a lighter take on the classic Kinder.	Barra Kinder Crispy con capas de oblea aireada y suave crema de leche, una versi├│n m├ís ligera del cl├ísico Kinder.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
326	KINDER DELICE	KINDER DELICE	Kinder Delice soft chocolate sponge cake with a smooth milk cream filling, individually wrapped for freshness.	Bizcocho de chocolate Kinder Delice con suave relleno de crema de leche, envuelto individualmente para mayor frescura.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
327	TRONKY 48 PACKS	TRONKY 48 PACKS	Ferrero Tronky hazelnut wafer rolls with smooth hazelnut and cocoa cream filling, display of 48 packs.	Rollos de oblea Ferrero Tronky con suave relleno de crema de avellana y cacao, display de 48 paquetes.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
328	KINDER TRONKY	KINDER TRONKY	Kinder Tronky crispy wafer roll filled with smooth hazelnut cream ΓÇö a light and delicious snack for kids.	Rollo de oblea crujiente Kinder Tronky relleno de suave crema de avellana ΓÇö un snack ligero y delicioso para ni├▒os.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
329	TRONKY T5X20X1	TRONKY T5X20X1	Ferrero Tronky hazelnut wafer rolls, bulk format T5x20x1 ΓÇö light, crispy and filled with hazelnut cream.	Rollos de oblea Ferrero Tronky de avellana, formato a granel T5x20x1 ΓÇö ligeros, crujientes y rellenos de crema de avellana.	https://target.scene7.com/is/image/Target/GUEST_ef828843-98f5-4a0a-816f-a00bd2e939ff	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
330	NUCITA 18 X 18	NUCITA 18 X 18	Nucita chocolate and hazelnut spread in individual portions, a classic Latin American treat loved by all ages.	Crema de chocolate y avellana Nucita en porciones individuales, un cl├ísico latinoamericano apreciado por todas las edades.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
331	NUCITA WAFER BIG 20G 12 X 24 PCS	NUCITA WAFER BIG 20G 12 X 24 PCS	Nucita Big Wafer with chocolate and hazelnut cream filling ΓÇö a larger, satisfying version of the classic wafer.	Nucita Wafer Grande con relleno de crema de chocolate y avellana ΓÇö una versi├│n m├ís grande y satisfactoria del wafer cl├ísico.	https://target.scene7.com/is/image/Target/GUEST_0c9661de-1736-4440-94fc-e888e6d07109	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
332	NUCITA ESPARCIBLE 12/350G	NUCITA ESPARCIBLE 12/350G	Nucita hazelnut and cocoa spread in a 350g jar ΓÇö perfect for spreading on bread, waffles, or fruit.	Crema para untar Nucita de avellana y cacao en frasco de 350g ΓÇö perfecta para pan, waffles o frutas.	https://target.scene7.com/is/image/Target/GUEST_d3aaa53d-bd41-4fa8-add6-3e1125de6e30	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
333	GALLETAS CUCA CANELA 30/8OZ	GALLETAS CUCA CANELA 30/8OZ	Cucas cinnamon cookies ΓÇö lightly spiced, crispy cinnamon-flavored cookies with a traditional homemade taste.	Galletas Cucas de canela ΓÇö galletas crujientes y ligeramente especiadas con sabor a canela y gusto tradicional casero.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
334	GALLETAS CUCAS JENGIBRE 30/8OZ	GALLETAS CUCAS JENGIBRE 30/8OZ	Cucas ginger cookies ΓÇö crispy and aromatic ginger-spiced cookies inspired by traditional Latin American recipes.	Galletas Cucas de jengibre ΓÇö galletas crujientes y arom├íticas con especias de jengibre de recetas latinoamericanas tradicionales.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
335	CRACKER GALLETAS DE MANTECA 24/6OZ	CRACKER GALLETAS DE MANTECA 24/6OZ	Classic butter crackers ΓÇö light, flaky, and buttery crackers perfect as a snack or paired with cheese and spreads.	Galletas de manteca cl├ísicas ΓÇö crackers ligeras, hojaldradas y mantecosas, perfectas como snack o con queso y untables.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
336	MANTECADITOS/GUAVA 30/8OZ	MANTECADITOS/GUAVA 30/8OZ	Mantecaditos with guava jam ΓÇö traditional Puerto Rican shortbread cookies topped with sweet guava jelly.	Mantecaditos con jalea de guayaba ΓÇö galletas de mantequilla puertorrique├▒as tradicionales con dulce jalea de guayaba.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
337	PINK RINGS LARGE 24/6OZ	PINK RINGS LARGE 24/6OZ	Large pink sugar-glazed ring cookies ΓÇö a classic carnival-style treat with a sweet vanilla flavor and festive look.	Galletas rosadas grandes en forma de argolla glaseadas con az├║car ΓÇö un cl├ísico festivo con sabor dulce a vainilla.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
338	CASCO DE MANTECA 16/8 OZ	CASCO DE MANTECA 16/8 OZ	Casco de manteca shortbread shells ΓÇö traditional crumbly butter pastry shells with a delicate sweet flavor.	Cascos de manteca ΓÇö masas de mantequilla tradicionales, desmigables y con delicado sabor dulce.		6	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
339	Chic-O-Stick	Chic-O-Stick	Chic-O-Stick peanut butter candy stick with a crunchy honeycomb texture and classic sweet peanut butter flavor.	Palito de mantequilla de man├¡ Chic-O-Stick con textura crujiente de panal y sabor dulce cl├ísico a mantequilla de man├¡.		7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
340	Serenata Display 24 unit	Serenata Display 24 unit	Serenata chocolate bars display with 24 units ΓÇö peanut and caramel chocolate bars, ideal for retail counters.	Display de barras de chocolate Serenata con 24 unidades ΓÇö barras de man├¡ y caramelo, ideales para mostrador de tienda.	https://target.scene7.com/is/image/Target/GUEST_b06c5f90-b90e-42a1-b89f-99d8f2ea17eb	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
341	Serenata Bag	Serenata Bag	Serenata chocolate mini bites in a resealable bag ΓÇö crunchy peanut and caramel chocolate pieces perfect for sharing.	Mini bocados de chocolate Serenata en bolsa resellable ΓÇö trozos crujientes de man├¡ y caramelo con chocolate, ideales para compartir.	https://target.scene7.com/is/image/Target/GUEST_b06c5f90-b90e-42a1-b89f-99d8f2ea17eb	5	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
342	YARA TOYS	YARA TOYS	Yara novelty candy toys ΓÇö fun interactive candy experiences combining sweet treats with playful toy elements.	Dulces novedosos Yara ΓÇö divertidas experiencias interactivas que combinan golosinas dulces con elementos de juguete.	https://futurofoods.com/cdn/shop/files/juqilittleduckwaterguntoycandy.jpg?v=1689791704	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
343	MEGA EGG	MEGA EGG	Mega Egg surprise candy ΓÇö a large novelty egg with a sweet candy shell and a surprise toy or candy inside.	Mega Egg de dulce sorpresa ΓÇö un gran huevo novedoso con cubierta de caramelo dulce y juguete o dulce sorpresa dentro.	https://futurofoods.com/cdn/shop/files/juqibeartoycandy_b2f8b037-58fc-40e3-940d-c2bd64e54365.webp?v=1689789772	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
344	SLIME LICKER	SLIME LICKER	Slime Licker sour rolling candy ΓÇö an intensely sour liquid candy in a roller bottle, a viral novelty treat.	Slime Licker caramelo l├¡quido enrollable y ├ícido ΓÇö un dulce l├¡quido intensamente ├ícido en botella rodante, sensaci├│n viral.		7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
345	BOTTLE DIPS	BOTTLE DIPS	Bottle Dips candy ΓÇö a fun novelty candy set with flavored dipping sticks and tangy powder for a sweet-sour experience.	Bottle Dips ΓÇö un divertido set de dulces novedosos con palitos para mojar y polvo ├ícido para una experiencia dulce-├ícida.		7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
346	YARA VENDING MACHINE	YARA VENDING MACHINE	Yara novelty vending machine candy toy ΓÇö a miniature vending machine dispenser filled with colorful sweet candies.	Dulce novedoso Yara m├íquina expendedora ΓÇö dispensador miniatura estilo m├íquina expendedora lleno de coloridos caramelos.	https://futurofoods.com/cdn/shop/files/juqilittleduckwaterguntoycandy.jpg?v=1689791704	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
347	TWIST & DIP	TWIST & DIP	Twist & Dip novelty candy ΓÇö a twistable lollipop with a tangy dipping powder for a fun dual-flavor experience.	Twist & Dip dulce novedoso ΓÇö paleta giratoria con polvo ├ícido para mojar, una divertida experiencia de doble sabor.		7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
348	YARA FORTUNE MACHINE	YARA FORTUNE MACHINE	Yara Fortune Machine novelty candy ΓÇö an interactive fortune-telling candy toy dispensing sweet surprises.	Yara Fortune Machine dulce novedoso ΓÇö juguete interactivo de dulces tipo m├íquina de la fortuna con sorpresas dulces.	https://futurofoods.com/cdn/shop/files/juqilittleduckwaterguntoycandy.jpg?v=1689791704	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
349	YARA SPORTS MANIA	YARA SPORTS MANIA	Yara Sports Mania novelty candy ΓÇö sports-themed interactive candy toy with fun collectible elements for kids.	Yara Sports Mania dulce novedoso ΓÇö dulce interactivo tem├ítico deportivo con divertidos elementos coleccionables para ni├▒os.	https://futurofoods.com/cdn/shop/files/juqilittleduckwaterguntoycandy.jpg?v=1689791704	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
350	DOBLON DISPLAY	DOBLON DISPLAY	Doblon novelty candy display ΓÇö a retail display featuring the popular Doblon interactive candy toys.	Display de dulces novedosos Doblon ΓÇö exhibidor para punto de venta con los populares dulces interactivos Doblon.	https://futurofoods.com/cdn/shop/files/juqibeartoycandy_b2f8b037-58fc-40e3-940d-c2bd64e54365.webp?v=1689789772	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
351	DOBLON BAG	DOBLON BAG	Doblon novelty candy bag ΓÇö an assortment of fun interactive candy toys packed in a convenient bag.	Bolsa de dulces novedosos Doblon ΓÇö surtido de divertidos dulces interactivos empacados en una bolsa conveniente.	https://futurofoods.com/cdn/shop/files/juqibeartoycandy_b2f8b037-58fc-40e3-940d-c2bd64e54365.webp?v=1689789772	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
352	HALLS HONEY LEMON 33.5GM/20CT*1DISPLAY	HALLS HONEY LEMON 33.5GM/20CT*1DISPLAY	Halls Honey Lemon throat drops ΓÇö soothing hard candy lozenges with honey and lemon flavor for throat relief.	Pastillas Halls Miel y Lim├│n ΓÇö caramelos suavizantes para la garganta con sabor a miel y lim├│n para alivio inmediato.	https://target.scene7.com/is/image/Target/GUEST_47e70961-e0c0-411e-9219-46e377c5dc08	12	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
353	HALLS MENTHOL/COOLWAVE 33.5GM/20CT*1DISPLAY	HALLS MENTHOL/COOLWAVE 33.5GM/20CT*1DISPLAY	Halls Menthol/Coolwave throat drops ΓÇö cooling menthol lozenges for soothing throat and nasal congestion relief.	Pastillas Halls Mentol/Coolwave ΓÇö caramelos mentolados refrescantes para aliviar la garganta y congesti├│n nasal.	https://target.scene7.com/is/image/Target/GUEST_47e70961-e0c0-411e-9219-46e377c5dc08	12	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
354	LA FE DULCE DE COCO MAMPOSTIAL 12/7OZ	LA FE DULCE DE COCO MAMPOSTIAL 12/7OZ	La Fe dulce de coco mampostial ΓÇö traditional Puerto Rican coconut candy made with shredded coconut and sugar syrup.	Dulce de coco mampostial La Fe ΓÇö dulce tradicional puertorrique├▒o elaborado con coco rallado y alm├¡bar de az├║car.		13	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
355	LA FE PALETA DE ANIS PILONES ROJOS 12/7OZ	LA FE PALETA DE ANIS PILONES ROJOS 12/7OZ	La Fe red anise pilones lollipops ΓÇö traditional sweet hard candy with an authentic anise flavor, beloved by generations.	Pilones rojos de an├¡s La Fe ΓÇö caramelo duro tradicional con aut├⌐ntico sabor a an├¡s, apreciado por generaciones.		13	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
356	DULCES LA FE GOFIO 12/6OZ	DULCES LA FE GOFIO 12/6OZ	La Fe Gofio ΓÇö traditional roasted cornmeal and sugar candy, a nostalgic Latin American sweet treat.	Gofio La Fe ΓÇö dulce tradicional de harina de ma├¡z tostada y az├║car, un nost├ílgico dulce latinoamericano.		13	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
357	CAFE RICO BAG 20/8 OZ	CAFE RICO BAG 20/8 OZ	Caf├⌐ Rico ground coffee, 8 oz bags ΓÇö a rich and aromatic Puerto Rican-style medium roast, box of 20.	Caf├⌐ Rico molido, bolsas de 8 oz ΓÇö un caf├⌐ puertorrique├▒o arom├ítico y rico de tueste medio, caja de 20.	https://futurofoods.com/cdn/shop/files/cafeborinquen.jpg?v=1684973806	14	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
358	CAFE RICO BAG 10/14 OZ	CAFE RICO BAG 10/14 OZ	Caf├⌐ Rico ground coffee, 14 oz bags ΓÇö full-bodied Puerto Rican coffee with a smooth finish, box of 10.	Caf├⌐ Rico molido, bolsas de 14 oz ΓÇö caf├⌐ puertorrique├▒o de cuerpo completo con un sabor suave y persistente, caja de 10.	https://futurofoods.com/cdn/shop/files/cafeborinquen.jpg?v=1684973806	14	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
359	CREMA GROUND COFFE 10/14 OZ	CREMA GROUND COFFE 10/14 OZ	Crema ground coffee, 14 oz bags ΓÇö smooth and balanced blend with a creamy finish, box of 10.	Caf├⌐ molido Crema, bolsas de 14 oz ΓÇö mezcla suave y equilibrada con acabado cremoso, caja de 10.	https://futurofoods.com/cdn/shop/files/cafedaqui_9832356e-5916-48aa-8041-0d86fd98be0f.jpg?v=1689705560	14	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
360	CREMA GROUND COFFE 20/8 OZ	CREMA GROUND COFFE 20/8 OZ	Crema ground coffee, 8 oz bags ΓÇö a smooth, well-balanced coffee blend with a light creamy taste, box of 20.	Caf├⌐ molido Crema, bolsas de 8 oz ΓÇö mezcla de caf├⌐ suave y bien equilibrada con ligero sabor cremoso, caja de 20.	https://futurofoods.com/cdn/shop/files/cafedaqui_9832356e-5916-48aa-8041-0d86fd98be0f.jpg?v=1689705560	14	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
361	VERO PINTA AZUL	VERO PINTA AZUL	Vero Pinta Azul lollipop ΓÇö a Mexican candy lollipop that stains your tongue blue with a sweet and tangy flavor.	Paleta Vero Pinta Azul ΓÇö paleta mexicana que ti├▒e la lengua de azul con un sabor dulce y ├ícido.	https://target.scene7.com/is/image/Target/GUEST_812e8d64-ac6b-4d1f-9081-253045bfe907	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
362	VERO PINTA ROJA	VERO PINTA ROJA	Vero Pinta Roja lollipop ΓÇö a Mexican candy lollipop that stains your tongue red with a sweet and fruity flavor.	Paleta Vero Pinta Roja ΓÇö paleta mexicana que ti├▒e la lengua de rojo con un sabor dulce y afrutado.	https://target.scene7.com/is/image/Target/GUEST_812e8d64-ac6b-4d1f-9081-253045bfe907	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
363	PALETA CHARMS CHERRY 12/48	PALETA CHARMS CHERRY 12/48	Charms Cherry lollipops ΓÇö classic sweet cherry-flavored hard candy pops, box of 12 packs of 48 units.	Paletas Charms de cereza ΓÇö cl├ísicas paletas de caramelo duro sabor cereza, caja de 12 paquetes de 48 unidades.	https://target.scene7.com/is/image/Target/GUEST_812e8d64-ac6b-4d1f-9081-253045bfe907	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
364	WATERMELON BLOW POP 48 CT X 12 BAGS	WATERMELON BLOW POP 48 CT X 12 BAGS	Blow Pop watermelon lollipops with a sweet watermelon candy shell and bubblegum center, 48 ct x 12 bags.	Paletas Blow Pop sabor sand├¡a con cubierta de caramelo dulce y centro de chicle, 48 unidades x 12 bolsas.	https://target.scene7.com/is/image/Target/GUEST_812e8d64-ac6b-4d1f-9081-253045bfe907	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
365	MINT BLOW POP 48 CT X 12 BAGS	MINT BLOW POP 48 CT X 12 BAGS	Blow Pop mint lollipops with a cool refreshing mint hard candy shell and bubblegum center, 48 ct x 12 bags.	Paletas Blow Pop sabor menta con cubierta de caramelo fresco y centro de chicle, 48 unidades x 12 bolsas.	https://target.scene7.com/is/image/Target/GUEST_812e8d64-ac6b-4d1f-9081-253045bfe907	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
366	BON BON BUM PALETA SURTIDA 16 BAGS X 48 PCS	BON BON BUM PALETA SURTIDA 16 BAGS X 48 PCS	Bon Bon Bum assorted lollipops with a bubblegum center in a variety of fruit flavors, 16 bags x 48 pieces.	Paletas Bon Bon Bum surtidas con centro de chicle en variedad de sabores frutales, 16 bolsas x 48 unidades.	https://target.scene7.com/is/image/Target/GUEST_812e8d64-ac6b-4d1f-9081-253045bfe907	7	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
367	SNAK MAN CHEEZE BALLS 8 PACKS X 10 BAGS	SNAK MAN CHEEZE BALLS 8 PACKS X 10 BAGS	Snak Man Cheese Balls ΓÇö light, crunchy puffed corn balls with bold cheddar cheese flavor, 8 packs x 10 bags.	Snak Man Bolitas de Queso ΓÇö bolitas de ma├¡z inflado, livianas y crujientes con intenso sabor a queso cheddar, 8 paquetes x 10 bolsas.		15	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
368	SNAK MAN CHEEZE CURLS 8 PACKS X 10 BAGS	SNAK MAN CHEEZE CURLS 8 PACKS X 10 BAGS	Snak Man Cheese Curls ΓÇö crunchy corn curls with a rich, bold cheese flavor coating, 8 packs x 10 bags.	Snak Man Rizos de Queso ΓÇö rizos de ma├¡z crujientes con rica y potente cobertura de sabor a queso, 8 paquetes x 10 bolsas.		15	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
369	CONFETTI STRAWBERRY KISS 12/5.3 OZ	CONFETTI STRAWBERRY KISS 12/5.3 OZ	Confetti Strawberry Kiss gummies ΓÇö soft and chewy strawberry-flavored gummy candies in a convenient tub.	Gomitas Confetti Strawberry Kiss ΓÇö gomitas suaves y masticables sabor fresa en un pr├íctico recipiente.	https://futurofoods.com/cdn/shop/files/tubconfettistrawberry.jpg?v=1684866477	10	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
370	CONFETTI SOUR BELTS 12/5.3 OZ	CONFETTI SOUR BELTS 12/5.3 OZ	Confetti Sour Belts ΓÇö chewy and intensely sour candy belts in assorted fruit flavors, great for sour candy fans.	Confetti Sour Belts ΓÇö cintas de caramelo masticables e intensamente ├ícidas en sabores frutales surtidos.	https://futurofoods.com/cdn/shop/files/tubconfettisourbelts.jpg?v=1689810590	10	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
371	CONFETTI SOUR RINGS 12/5.3 OZ	CONFETTI SOUR RINGS 12/5.3 OZ	Confetti Sour Rings ΓÇö chewy gummy rings with a tangy sour coating in assorted fruit flavors.	Confetti Sour Rings ΓÇö anillos de goma masticables con cobertura ├ícida en sabores frutales surtidos.	https://futurofoods.com/cdn/shop/files/tubconfettisourrings.jpg?v=1684869101	10	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
372	CONFETTI PIZZA TUB 12/5.3 OZ	CONFETTI PIZZA TUB 12/5.3 OZ	Confetti Pizza gummies ΓÇö fun pizza-shaped gummy candies with fruity flavors in a shareable tub.	Gomitas Confetti Pizza ΓÇö divertidas gomitas en forma de pizza con sabores frutales en un recipiente para compartir.	https://futurofoods.com/cdn/shop/files/tubconfettipizza.jpg?v=1684867173	10	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
373	CONFETTI BEAR TUB 12/5.5 OZ	CONFETTI BEAR TUB 12/5.5 OZ	Confetti Gummy Bears ΓÇö classic soft and chewy gummy bears in assorted fruit flavors, packed in a shareable tub.	Osos de goma Confetti ΓÇö cl├ísicos osos de goma suaves y masticables en sabores frutales surtidos, en recipiente para compartir.	https://futurofoods.com/cdn/shop/files/tubconfettigummybears.jpg?v=1684868539	10	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
374	CONFETTI BABY SHARKS 12/7 OZ	CONFETTI BABY SHARKS 12/7 OZ	Confetti Baby Sharks gummies ΓÇö adorable shark-shaped gummy candies in assorted fruit flavors, fun for all ages.	Gomitas Confetti Baby Sharks ΓÇö adorables gomitas en forma de tibur├│n en sabores frutales surtidos, divertidas para todas las edades.	https://futurofoods.com/cdn/shop/files/tubconfettiShark.webp?v=1684866802	10	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
375	CONFETTI WATERMELON TUB 12/5.5 OZ	CONFETTI WATERMELON TUB 12/5.5 OZ	Confetti Watermelon gummies ΓÇö juicy watermelon-flavored gummy candies in a convenient shareable tub.	Gomitas Confetti de sand├¡a ΓÇö gomitas sabor sand├¡a jugosa en un pr├íctico recipiente para compartir.	https://futurofoods.com/cdn/shop/files/tubconfettiwatermelon.jpg?v=1684858224	10	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
376	UNTOUCHABLE & EVER WET	UNTOUCHABLE & EVER WET	Untouchable & Ever Wet hydrophobic car detailing product ΓÇö provides a long-lasting water-repellent protective coating.	Producto de detallado automotriz hidrof├│bico Untouchable & Ever Wet ΓÇö proporciona una cobertura protectora repelente al agua duradera.		11	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
377	DR. MECANICO SPRAY 6/32 OZ	DR. MECANICO SPRAY 6/32 OZ	Dr. Mec├ínico multi-purpose automotive spray cleaner ΓÇö removes grease, grime, and carbon deposits from engine parts.	Limpiador automotriz en spray multiprop├│sito Dr. Mec├ínico ΓÇö elimina grasa, suciedad y dep├│sitos de carb├│n de piezas del motor.		11	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
378	DR. MECANICO GALLON 4/1 GAL	DR. MECANICO GALLON 4/1 GAL	Dr. Mec├ínico automotive cleaner and degreaser in 1-gallon format ΓÇö professional-grade formula for heavy-duty cleaning.	Limpiador y desengrasante automotriz Dr. Mec├ínico en formato de 1 gal├│n ΓÇö f├│rmula de grado profesional para limpieza pesada.		11	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
379	CRISTAL SACATO ENGINE & MACHINERY 12/32 OZ	CRISTAL SACATO ENGINE & MACHINERY 12/32 OZ	Cristal Sacato engine and machinery degreaser, 32 oz ΓÇö powerful formula that cuts through grease and tough buildup.	Desengrasante de motores y maquinaria Cristal Sacato, 32 oz ΓÇö f├│rmula potente que elimina grasa y suciedad acumulada.		11	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
380	CRISTAL SACATO ENGINE & MACHINERY 5 GALLONS	CRISTAL SACATO ENGINE & MACHINERY 5 GALLONS	Cristal Sacato engine and machinery degreaser, 5-gallon bulk format ΓÇö ideal for workshops and high-volume cleaning.	Desengrasante de motores y maquinaria Cristal Sacato, formato a granel de 5 galones ΓÇö ideal para talleres y limpieza de alto volumen.		11	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
381	UVITA MULTI CLEANER WASH & WAX 6/32 OZ	UVITA MULTI CLEANER WASH & WAX 6/32 OZ	Uvita Multi Cleaner Wash & Wax ΓÇö cleans and shines your vehicle in one step, leaving a protective wax finish.	Uvita Multi Cleaner Wash & Wax ΓÇö limpia y abrillanta tu veh├¡culo en un solo paso, dejando un acabado de cera protector.		11	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
382	UVITA MULTI CLEANER WASH & WAX 4/128 OZ	UVITA MULTI CLEANER WASH & WAX 4/128 OZ	Uvita Multi Cleaner Wash & Wax in 128 oz large format ΓÇö professional-grade car wash and wax solution for fleets.	Uvita Multi Cleaner Wash & Wax en formato grande de 128 oz ΓÇö soluci├│n profesional para lavado y encerado de veh├¡culos.		11	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
383	MORTADELLA DANESANO	MORTADELLA DANESANO	Danesano mortadella ΓÇö premium Italian-style cured pork sausage with delicate spices, smooth texture, and rich flavor.	Mortadela Danesano ΓÇö embutido de cerdo curado estilo italiano premium con delicadas especias, textura suave y rico sabor.		16	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
384	KNORR	KNORR	Knorr seasoning bouillon ΓÇö a versatile all-purpose seasoning that enhances the flavor of soups, stews, rice, and meats.	Sazonador Knorr ΓÇö un condimento vers├ítil todo uso que realza el sabor de sopas, guisos, arroz y carnes.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
385	Sofrito Don Julio 100% natural	Sofrito Don Julio 100% natural	Don Julio 100% natural sofrito ΓÇö authentic Latin seasoning blend made with fresh herbs, peppers, and garlic.	Sofrito 100% natural Don Julio ΓÇö aut├⌐ntica mezcla de condimentos latinos elaborada con hierbas frescas, pimientos y ajo.	https://futurofoods.com/cdn/shop/files/SofritoShelfStable.jpg?v=1689793012	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
386	DON JULIO SOFRITO VERDE 12/32 OZ	DON JULIO SOFRITO VERDE 12/32 OZ	Don Julio Green Sofrito ΓÇö traditional Latin herb-based cooking sauce with cilantro, culantro, and green peppers.	Sofrito Verde Don Julio ΓÇö salsa de cocina latina tradicional con cilantro, recao y pimientos verdes, 12 x 32 oz.	https://futurofoods.com/cdn/shop/files/SofritoShelfStable.jpg?v=1689793012	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
387	DON JULIO SOFRITO CON PIMIENTOS ROJOS 12/32 OZ	DON JULIO SOFRITO CON PIMIENTOS ROJOS 12/32 OZ	Don Julio Sofrito with Red Peppers ΓÇö classic Latin cooking base enriched with sweet roasted red peppers for extra flavor.	Sofrito con Pimientos Rojos Don Julio ΓÇö base de cocina latina cl├ísica enriquecida con pimientos rojos asados para mayor sabor.	https://futurofoods.com/cdn/shop/files/SofritoShelfStable.jpg?v=1689793012	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
388	DON JULIO RECAITO 12/32 OZ	DON JULIO RECAITO 12/32 OZ	Don Julio Recaito ΓÇö traditional cilantro-based cooking sauce essential for authentic Puerto Rican and Caribbean dishes.	Reca├¡to Don Julio ΓÇö salsa de cocina a base de cilantro esencial para platos aut├⌐nticos puertorrique├▒os y caribe├▒os.	https://futurofoods.com/cdn/shop/files/recaito100natural.jpg?v=1689793142	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
389	DON JULIO SOFRITO CURCUMA 12/32 OZ	DON JULIO SOFRITO CURCUMA 12/32 OZ	Don Julio Turmeric Sofrito ΓÇö a vibrant Latin cooking base blended with golden turmeric for color and anti-inflammatory benefits.	Sofrito con C├║rcuma Don Julio ΓÇö base de cocina latina mezclada con c├║rcuma dorada para color y beneficios antiinflamatorios.	https://futurofoods.com/cdn/shop/files/SofritoShelfStable.jpg?v=1689793012	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
390	DON JULIO AJO NATURAL 12/32 OZ	DON JULIO AJO NATURAL 12/32 OZ	Don Julio Natural Garlic ΓÇö freshly minced garlic in a jar, ready-to-use and packed with bold, authentic garlic flavor.	Ajo Natural Don Julio ΓÇö ajo finamente picado en frasco, listo para usar y con intenso y aut├⌐ntico sabor a ajo.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
391	DON JULIO AJO PEREJIL 12/32 OZ	DON JULIO AJO PEREJIL 12/32 OZ	Don Julio Garlic with Parsley ΓÇö minced garlic blended with fresh parsley, perfect for enhancing meats, pasta, and sauces.	Ajo con Perejil Don Julio ΓÇö ajo picado mezclado con perejil fresco, perfecto para carnes, pastas y salsas.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
392	DON JULIO AJO CON MANTEQUILLA 12/32 OZ	DON JULIO AJO CON MANTEQUILLA 12/32 OZ	Don Julio Garlic with Butter ΓÇö a rich blend of minced garlic and creamy butter, ideal for garlic bread, seafood, and more.	Ajo con Mantequilla Don Julio ΓÇö mezcla rica de ajo picado y mantequilla cremosa, ideal para pan de ajo, mariscos y m├ís.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
393	DON JULIO AJO CHOPS 12/32 OZ	DON JULIO AJO CHOPS 12/32 OZ	Don Julio Chopped Garlic ΓÇö coarsely chopped garlic in a jar, perfect for adding a rustic garlic bite to any dish.	Ajo Chops Don Julio ΓÇö ajo groseramente picado en frasco, perfecto para a├▒adir un mordisco r├║stico de ajo a cualquier plato.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
394	DON JULIO AJO CON PEREJIL 24/8	DON JULIO AJO CON PEREJIL 24/8	Don Julio Garlic with Parsley ΓÇö minced garlic and fresh parsley blend in convenient 8 oz jars, pack of 24.	Ajo con Perejil Don Julio ΓÇö mezcla de ajo picado y perejil fresco en pr├ícticos frascos de 8 oz, caja de 24.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
395	DON JULIO AJO CHOPS 24/8 OZ	DON JULIO AJO CHOPS 24/8 OZ	Don Julio Chopped Garlic in 8 oz jars, pack of 24 ΓÇö coarsely chopped for a bold, rustic garlic flavor in every bite.	Ajo Chops Don Julio en frascos de 8 oz, caja de 24 ΓÇö picado grueso para un sabor a ajo intenso y r├║stico en cada uso.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
396	DON JULIO AJO NATURAL 24/8 OZ	DON JULIO AJO NATURAL 24/8 OZ	Don Julio Natural Garlic in 8 oz jars, pack of 24 ΓÇö freshly minced garlic ready to use in any savory recipe.	Ajo Natural Don Julio en frascos de 8 oz, caja de 24 ΓÇö ajo reci├⌐n picado listo para usar en cualquier receta salada.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
397	DON JULIO AJO CON MANTEQUILLA 24/8 OZ	DON JULIO AJO CON MANTEQUILLA 24/8 OZ	Don Julio Garlic with Butter in 8 oz jars, pack of 24 ΓÇö a rich garlic-butter blend for breads, pastas, and proteins.	Ajo con Mantequilla Don Julio en frascos de 8 oz, caja de 24 ΓÇö rica mezcla de ajo y mantequilla para panes, pastas y prote├¡nas.	https://target.scene7.com/is/image/Target/GUEST_94d36013-5bba-48cc-a691-86d02b1c6fce	8	2026-05-15 14:26:05.721099+00	2026-05-15 14:26:05.721099+00	t	f
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, token, user_id, expires_at, created_at) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2ZDMwOWRkLWUyZTItNDViNi04OWIxLWVjNTVkOGUzNmVhNCIsImlhdCI6MTc3ODYxNjY5MiwiZXhwIjoxNzc5MjIxNDkyfQ.PLKUqsxiLiYh6AXlJIE4MKMeyIRHxfAeONBBemzS3G0	d6d309dd-e2e2-45b6-89b1-ec55d8e36ea4	2026-05-19 20:11:32.754+00	2026-05-12 20:11:32.758419+00
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2ZDMwOWRkLWUyZTItNDViNi04OWIxLWVjNTVkOGUzNmVhNCIsImlhdCI6MTc3ODYxNjkwNiwiZXhwIjoxNzc5MjIxNzA2fQ.s6Zj3J_6618AP9H7rbqL-60vyBwuSzdo1l4L-VwHXio	d6d309dd-e2e2-45b6-89b1-ec55d8e36ea4	2026-05-19 20:15:06.754+00	2026-05-12 20:15:06.754977+00
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2ZDMwOWRkLWUyZTItNDViNi04OWIxLWVjNTVkOGUzNmVhNCIsImlhdCI6MTc3ODYxNzE0OCwiZXhwIjoxNzc5MjIxOTQ4fQ.V7e9a8Bsrt3E1nQuJAhQhwiXl-uRkwXzGxuHDEVCZTI	d6d309dd-e2e2-45b6-89b1-ec55d8e36ea4	2026-05-19 20:19:08.028+00	2026-05-12 20:19:08.029042+00
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2ZDMwOWRkLWUyZTItNDViNi04OWIxLWVjNTVkOGUzNmVhNCIsImlhdCI6MTc3ODYxNzc2NywiZXhwIjoxNzc5MjIyNTY3fQ.KUc49nADtJxLd9ieUlBFHqZCCO-SZ56SIv9L0hZ8CCU	d6d309dd-e2e2-45b6-89b1-ec55d8e36ea4	2026-05-19 20:29:27.697+00	2026-05-12 20:29:27.700087+00
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2ZDMwOWRkLWUyZTItNDViNi04OWIxLWVjNTVkOGUzNmVhNCIsImlhdCI6MTc3ODYxODU3OSwiZXhwIjoxNzc5MjIzMzc5fQ.hR6YShMppQrF9QBOGUjIFM9_dIKZ58GJ03yHsSDNQXw	d6d309dd-e2e2-45b6-89b1-ec55d8e36ea4	2026-05-19 20:42:59.571+00	2026-05-12 20:42:59.573753+00
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYTRiMGVlLTg2MDYtNDRiMy1iMzZjLTRkNzk2YTg5YTMwNCIsImlhdCI6MTc3ODYyNTA3MCwiZXhwIjoxNzc5MjI5ODcwfQ.UK5lg9LDsnOa2n6nuCJ2x2DGmsFJFkQQXCxu3t6sXlM	83a4b0ee-8606-44b3-b36c-4d796a89a304	2026-05-19 22:31:10.058+00	2026-05-12 22:31:10.05925+00
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYTRiMGVlLTg2MDYtNDRiMy1iMzZjLTRkNzk2YTg5YTMwNCIsImlhdCI6MTc3ODY0MDE4NCwiZXhwIjoxNzc5MjQ0OTg0fQ.i6guihTABuF4mA_3kRwf6vqVAZwk0nYe7agFCqTzS54	83a4b0ee-8606-44b3-b36c-4d796a89a304	2026-05-20 02:43:04.436+00	2026-05-13 02:43:04.439093+00
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYTRiMGVlLTg2MDYtNDRiMy1iMzZjLTRkNzk2YTg5YTMwNCIsImlhdCI6MTc3ODgxMzc3NCwiZXhwIjoxNzc5NDE4NTc0fQ.H85dTOL-KElQYv4Il3W0ULLhSdHnfAKbW6KD844MhJo	83a4b0ee-8606-44b3-b36c-4d796a89a304	2026-05-22 02:56:14.829+00	2026-05-15 02:56:14.831011+00
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYTRiMGVlLTg2MDYtNDRiMy1iMzZjLTRkNzk2YTg5YTMwNCIsImlhdCI6MTc3ODg1NTE1MywiZXhwIjoxNzc5NDU5OTUzfQ.e3wr5YDgKA8leJsRI-QSf8hGnsw3V1ZEx3amJH9WYpY	83a4b0ee-8606-44b3-b36c-4d796a89a304	2026-05-22 14:25:53.066+00	2026-05-15 14:25:53.06894+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, created_at, updated_at) FROM stdin;
d6d309dd-e2e2-45b6-89b1-ec55d8e36ea4	admin@omdistribution.com	$2a$10$e5reHEB21skWZWXSwseGUOAmUcS1DTZO0sKqOsClrJtQIDOq/zQN6	admin	2026-05-12 13:39:28.45692+00	2026-05-12 20:08:18.400367+00
83a4b0ee-8606-44b3-b36c-4d796a89a304	euclidesm195@gmail.com	$2a$10$n2yymx19pkETk7hhMlyu7evCAemmF0nKTFDN7BldcAfHKsRCKcWgO	admin	2026-05-12 20:16:53.958154+00	2026-05-15 02:55:42.373597+00
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 16, true);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 397, true);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 11, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: categories update_categories_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_categories_modtime BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: products update_products_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_products_modtime BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: users update_users_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 0RqvUZW1uJtb3k28Lj1FDU36gzxTVxQ4Bs7bRB7xeLObpLObYnofyncyKbklC35


