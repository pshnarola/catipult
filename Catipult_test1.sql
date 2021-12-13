--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: enum_charpLog_charpStatus; Type: TYPE; Schema: public; Owner: catipult_cati
--

CREATE TYPE "enum_charpLog_charpStatus" AS ENUM (
    'C',
    'H',
    'A',
    'R',
    'P'
);


ALTER TYPE public."enum_charpLog_charpStatus" OWNER TO catipult_cati;

--
-- Name: enum_invites_status; Type: TYPE; Schema: public; Owner: catipult_cati
--

CREATE TYPE enum_invites_status AS ENUM (
    'invited',
    'created'
);


ALTER TYPE public.enum_invites_status OWNER TO catipult_cati;

--
-- Name: enum_kpi_charpStatus; Type: TYPE; Schema: public; Owner: catipult_cati
--

CREATE TYPE "enum_kpi_charpStatus" AS ENUM (
    'C',
    'H',
    'A',
    'R',
    'P'
);


ALTER TYPE public."enum_kpi_charpStatus" OWNER TO catipult_cati;

--
-- Name: enum_kpilog_charpStatus; Type: TYPE; Schema: public; Owner: catipult_cati
--

CREATE TYPE "enum_kpilog_charpStatus" AS ENUM (
    'C',
    'H',
    'A',
    'R',
    'P'
);


ALTER TYPE public."enum_kpilog_charpStatus" OWNER TO catipult_cati;

--
-- Name: enum_milestones_charpStatus; Type: TYPE; Schema: public; Owner: catipult_cati
--

CREATE TYPE "enum_milestones_charpStatus" AS ENUM (
    'C',
    'H',
    'A',
    'R',
    'P'
);


ALTER TYPE public."enum_milestones_charpStatus" OWNER TO catipult_cati;

--
-- Name: enum_remainder_remainderType; Type: TYPE; Schema: public; Owner: catipult_cati
--

CREATE TYPE "enum_remainder_remainderType" AS ENUM (
    'daily',
    'weekly',
    'monthly',
    'quarter',
    'year',
    'none'
);


ALTER TYPE public."enum_remainder_remainderType" OWNER TO catipult_cati;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: charpLog; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE "charpLog" (
    "charplogID" character(36) NOT NULL,
    qty character varying(255),
    comments character varying(255),
    "charpStatus" "enum_charpLog_charpStatus",
    isupdate boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "mileID" character(36),
    "uID" character(36)
);


ALTER TABLE public."charpLog" OWNER TO catipult_cati;

--
-- Name: department; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE department (
    "depID" character(36) NOT NULL,
    "deptName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "orgID" character(36)
);


ALTER TABLE public.department OWNER TO catipult_cati;

--
-- Name: deviceregister; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE deviceregister (
    "depID" character(36) NOT NULL,
    "secretKey" json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "uID" character(36)
);


ALTER TABLE public.deviceregister OWNER TO catipult_cati;

--
-- Name: drivers; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE drivers (
    "driverID" character(36) NOT NULL,
    "driverName" character varying(255),
    "driverImage" character varying(255),
    "driverVideo" character varying(255),
    "seqNo" bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.drivers OWNER TO catipult_cati;

--
-- Name: invites; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE invites (
    "invID" character(36) NOT NULL,
    "mobileNumber" character varying(255),
    email character varying(255),
    status enum_invites_status NOT NULL,
    code character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "rID" character(36),
    "uID" character(36)
);


ALTER TABLE public.invites OWNER TO catipult_cati;

--
-- Name: kpi; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE kpi (
    "kpiID" character(36) NOT NULL,
    qty character varying(255),
    "achieveQty" character varying(255),
    unit character varying(255),
    objective character varying(255),
    "dependFlag" boolean DEFAULT false,
    "charpStatus" "enum_kpi_charpStatus" NOT NULL,
    "dueData" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "driverID" character(36),
    "uID" character(36)
);


ALTER TABLE public.kpi OWNER TO catipult_cati;

--
-- Name: kpilog; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE kpilog (
    "kpilogID" character(36) NOT NULL,
    qty character varying(255),
    comments character varying(255),
    "charpStatus" "enum_kpilog_charpStatus" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "kpiID" character(36),
    "uID" character(36)
);


ALTER TABLE public.kpilog OWNER TO catipult_cati;

--
-- Name: leval; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE leval (
    "levalID" character(36) NOT NULL,
    "levalName" character varying(255),
    "levalNo" bigint DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.leval OWNER TO catipult_cati;

--
-- Name: milestones; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE milestones (
    "mileID" character(36) NOT NULL,
    qty character varying(255),
    "achieveText" character varying(255),
    type character varying(255),
    "dueDate" date,
    "dependFlag" boolean DEFAULT false,
    "superReferUserID" character varying(255),
    "charpStatus" "enum_milestones_charpStatus" DEFAULT 'C'::"enum_milestones_charpStatus" NOT NULL,
    "charpCount" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "kpiID" character(36),
    "uID" character(36),
    "mileReferID" character(36)
);


ALTER TABLE public.milestones OWNER TO catipult_cati;

--
-- Name: notification; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE notification (
    "notifyID" character(36) NOT NULL,
    "isRead" boolean DEFAULT false,
    "dueDate" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "uID" character(36),
    "mileID" character(36)
);


ALTER TABLE public.notification OWNER TO catipult_cati;

--
-- Name: onboardingstatus; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE onboardingstatus (
    "onboardingStatusID" character(36) NOT NULL,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "pagecontentID" character(36),
    "uID" character(36)
);


ALTER TABLE public.onboardingstatus OWNER TO catipult_cati;

--
-- Name: option; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE option (
    "optionID" character(36) NOT NULL,
    option character varying(255),
    "correctAns" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "queID" character(36)
);


ALTER TABLE public.option OWNER TO catipult_cati;

--
-- Name: organization; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE organization (
    "orgID" character(36) NOT NULL,
    "orgName" character varying(255),
    address character varying(255),
    city character varying(255),
    "logoUrl" character varying(255),
    "secretCode" character varying(255),
    email character varying(255),
    "startDate" date,
    "endDate" date,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.organization OWNER TO catipult_cati;

--
-- Name: pagecontent; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE pagecontent (
    "pagecontentID" character(36) NOT NULL,
    "pageName" character varying(255),
    content character varying(255),
    "videoUrl" character varying(255),
    routers character varying(255),
    "nextRoute" character varying(255),
    "nextPage" character varying(255),
    "pageInfo" json,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "driverID" character(36)
);


ALTER TABLE public.pagecontent OWNER TO catipult_cati;

--
-- Name: quarterkpiassign; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE quarterkpiassign (
    "qkaID" character(36) NOT NULL,
    "targetAchieve" character varying(255),
    status boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "qsID" character(36),
    "mileID" character(36),
    "uID" character(36)
);


ALTER TABLE public.quarterkpiassign OWNER TO catipult_cati;

--
-- Name: quartersplit; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE quartersplit (
    "qsID" character(36) NOT NULL,
    type character varying(255),
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "uID" character(36)
);


ALTER TABLE public.quartersplit OWNER TO catipult_cati;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE questions (
    "queID" character(36) NOT NULL,
    question character varying(255),
    "isActive" boolean DEFAULT false,
    "seqNo" numeric(10,2) DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "qtID" character(36),
    "driverID" character(36)
);


ALTER TABLE public.questions OWNER TO catipult_cati;

--
-- Name: questiontype; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE questiontype (
    "qtID" character(36) NOT NULL,
    "typeName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.questiontype OWNER TO catipult_cati;

--
-- Name: remainder; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE remainder (
    "remainderID" character(36) NOT NULL,
    "remainderType" "enum_remainder_remainderType" NOT NULL,
    "time" time without time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "kpiID" character(36)
);


ALTER TABLE public.remainder OWNER TO catipult_cati;

--
-- Name: rfp; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE rfp (
    "rfpID" character(36) NOT NULL,
    "qSelectID" character(36),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "queID" character(36)
);


ALTER TABLE public.rfp OWNER TO catipult_cati;

--
-- Name: role; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE role (
    "rID" character(36) NOT NULL,
    "roleName" character varying(255),
    leval character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "depID" character(36)
);


ALTER TABLE public.role OWNER TO catipult_cati;

--
-- Name: section; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE section (
    "sectionID" character(36) NOT NULL,
    "sectionName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "driverID" character(36)
);


ALTER TABLE public.section OWNER TO catipult_cati;

--
-- Name: sectioncompleted; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE sectioncompleted (
    "sectioncompletedID" character(36) NOT NULL,
    "isCompleted" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sectionID" character(36),
    "uID" character(36)
);


ALTER TABLE public.sectioncompleted OWNER TO catipult_cati;

--
-- Name: settings; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE settings (
    "settingID" character(36) NOT NULL,
    "dateTrigger" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.settings OWNER TO catipult_cati;

--
-- Name: useranswer; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE useranswer (
    "uanswID" character(36) NOT NULL,
    answer character varying(255),
    "rfpqID" character varying(255) DEFAULT '123'::character varying,
    "isActive" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "uID" character(36),
    "queID" character(36),
    "optionID" character(36),
    "driverID" character(36)
);


ALTER TABLE public.useranswer OWNER TO catipult_cati;

--
-- Name: useroutcome; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE useroutcome (
    "uoID" character(36) NOT NULL,
    statement character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "uID" character(36)
);


ALTER TABLE public.useroutcome OWNER TO catipult_cati;

--
-- Name: users; Type: TABLE; Schema: public; Owner: catipult_cati; Tablespace: 
--

CREATE TABLE users (
    "uID" character(36) NOT NULL,
    name character varying(255),
    lname character varying(255),
    email character varying(255),
    password character varying(255),
    statement character varying(255),
    "resetCode" character varying(255),
    info json,
    "roleAdmin" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "rID" character(36)
);


ALTER TABLE public.users OWNER TO catipult_cati;

--
-- Data for Name: charpLog; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY "charpLog" ("charplogID", qty, comments, "charpStatus", isupdate, "createdAt", "updatedAt", "mileID", "uID") FROM stdin;
eed8d18c-57f6-472d-aec5-c30744df769e	\N	\N	\N	f	2020-04-12 04:51:52.398+00	2020-04-12 04:51:52.398+00	\N	1b885225-2215-4098-9235-b01e6737b226
aebfcd7d-2fb1-46ac-982f-8f5bc3c31e69	\N	\N	\N	f	2020-04-12 04:51:52.401+00	2020-04-12 04:51:52.401+00	\N	1b885225-2215-4098-9235-b01e6737b226
ce7caa76-3d39-46f6-8013-44d8c3b31f53	\N	\N	\N	f	2020-04-11 19:18:19.987+00	2020-04-11 19:18:19.987+00	\N	1b885225-2215-4098-9235-b01e6737b226
5d5d01df-c7e9-4120-93c3-2a5b28cbce94	\N	\N	\N	f	2020-04-12 04:51:52.401+00	2020-04-12 04:51:52.401+00	\N	1b885225-2215-4098-9235-b01e6737b226
33945968-c64a-4955-b6e4-75b39d459d3f	\N	\N	\N	f	2020-04-12 10:47:16.69+00	2020-04-12 10:47:16.69+00	\N	1b885225-2215-4098-9235-b01e6737b226
527a0b01-fb4b-4fca-9e8f-865c53fb5c4b	\N	\N	\N	f	2020-04-12 12:33:27.054+00	2020-04-12 12:33:27.054+00	\N	1b885225-2215-4098-9235-b01e6737b226
637bfd3d-588e-48fc-97d3-3f3abe82527b	\N	\N	\N	f	2020-04-12 12:33:33.377+00	2020-04-12 12:33:33.377+00	\N	1b885225-2215-4098-9235-b01e6737b226
4c1faff7-a6a7-48e7-9dd7-0fd779f65892	\N	\N	\N	f	2020-04-12 13:41:55.302+00	2020-04-12 13:41:55.302+00	\N	1b885225-2215-4098-9235-b01e6737b226
f059e8f4-3843-4cc7-be63-ef4440894cfc	\N	\N	P	f	2020-03-27 16:57:51.962+00	2020-03-30 13:31:01.222+00	\N	be48312f-af3a-454e-afd3-f6894b305985
5da51172-68b4-44ee-89e3-b9654538b2ca	\N	\N	R	f	2020-03-31 05:33:30.082+00	2020-04-06 13:19:52.706+00	\N	a2bf350c-51a3-42cf-9323-deb7467518f8
32b6828e-32d6-418c-a730-8bb13f6fcb65	\N	\N	\N	f	2020-04-12 13:42:00.433+00	2020-04-12 13:42:00.433+00	\N	1b885225-2215-4098-9235-b01e6737b226
0d25397e-dd5a-44e2-a574-4a7d82b4b376	\N	\N	\N	f	2020-04-12 13:42:05.733+00	2020-04-12 13:42:05.733+00	\N	1b885225-2215-4098-9235-b01e6737b226
3a45fa29-f73e-46e0-afcc-a3ac05f4ca45	\N	\N	P	f	2020-03-30 13:56:45.595+00	2020-04-03 12:59:14.744+00	\N	be48312f-af3a-454e-afd3-f6894b305985
1b5d85d1-de39-4eb6-a4b6-0211cde1341c	\N	\N	\N	f	2020-04-13 11:59:51.354+00	2020-04-13 11:59:51.354+00	\N	fcf38be9-bcd3-4643-9352-43902831f654
c0904c58-c281-4a46-b77b-9824b1eba003	\N	\N	\N	f	2020-04-13 13:28:36.979+00	2020-04-13 13:28:36.979+00	\N	be48312f-af3a-454e-afd3-f6894b305985
fcb7cfda-829a-413e-b0dc-6e3fed0c98bb	\N	\N	\N	f	2020-04-13 11:10:56.77+00	2020-04-13 11:10:56.77+00	\N	1b885225-2215-4098-9235-b01e6737b226
808e4d25-21dc-4901-86f7-98aaff4d747d	\N	\N	\N	f	2020-04-13 11:10:44.792+00	2020-04-13 11:10:44.792+00	\N	1b885225-2215-4098-9235-b01e6737b226
34ad8c7d-ab94-403c-8f88-13224a83a686	\N	\N	P	f	2020-04-04 15:15:01.166+00	2020-04-06 13:11:04.392+00	\N	be48312f-af3a-454e-afd3-f6894b305985
bb14a7a4-0b82-4da3-8ac8-ab8448d72816	\N	\N	\N	f	2020-04-13 11:11:12.236+00	2020-04-13 11:11:12.236+00	\N	1b885225-2215-4098-9235-b01e6737b226
85fdc913-3324-45e3-980d-cf12fcba7ae2	\N	\N	\N	f	2020-04-13 13:45:13.934+00	2020-04-13 13:45:13.934+00	\N	1b885225-2215-4098-9235-b01e6737b226
5463c113-b535-4eb8-bf10-f125a1b2cf7d	\N	\N	\N	f	2020-04-13 13:47:20.603+00	2020-04-13 13:47:20.603+00	\N	1b885225-2215-4098-9235-b01e6737b226
896942fd-cc13-45dd-884f-a947f4a91375	\N	\N	P	f	2020-04-04 15:15:12.109+00	2020-04-06 13:11:12.494+00	\N	be48312f-af3a-454e-afd3-f6894b305985
4a3144fc-1a3d-498d-9a16-b99f7baa8188	\N	\N	\N	f	2020-03-30 14:04:29.412+00	2020-03-30 14:04:29.412+00	\N	be48312f-af3a-454e-afd3-f6894b305985
9fb2d389-1659-4b72-ba4f-1d14e7e2ec04	\N	\N	P	f	2020-03-27 16:49:41.759+00	2020-03-30 13:37:26.588+00	\N	be48312f-af3a-454e-afd3-f6894b305985
83564fcb-7a32-4b35-9274-294ad81943b7	\N	\N	\N	f	2020-04-03 12:58:06.126+00	2020-04-03 12:58:06.126+00	\N	89134b99-2441-4e63-8852-043e0cdfb372
85195f8d-692f-4ef3-9a0c-0a839ac9f8f3	\N	\N	P	f	2020-03-27 16:50:40.175+00	2020-03-30 13:39:06.2+00	\N	be48312f-af3a-454e-afd3-f6894b305985
9798968f-d28e-47ef-b8ae-df92cfdc2494	\N	\N	\N	f	2020-03-31 05:33:30.126+00	2020-03-31 05:33:30.126+00	\N	89134b99-2441-4e63-8852-043e0cdfb372
77c22cfe-6f52-4abb-87ca-9b5e6160130c	\N	\N	P	f	2020-04-01 14:12:16.337+00	2020-04-03 03:37:52.196+00	\N	be48312f-af3a-454e-afd3-f6894b305985
a9c1528f-cc3e-4e48-9afa-448e71aa70ca	\N	\N	\N	f	2020-04-03 12:58:06.15+00	2020-04-03 12:58:06.15+00	\N	89134b99-2441-4e63-8852-043e0cdfb372
d07597cd-9e80-4644-9157-9d11b916bc77	\N	\N	P	f	2020-03-27 16:50:18.117+00	2020-03-30 13:29:16.962+00	\N	be48312f-af3a-454e-afd3-f6894b305985
c2945e91-6102-4c7a-bd50-aabd73f2af3a	\N	\N	R	f	2020-04-02 03:04:12.679+00	2020-04-03 12:59:21.881+00	\N	a2bf350c-51a3-42cf-9323-deb7467518f8
c7ae2b14-f4fe-4ae5-ac00-8889005b8bf9	\N	\N	P	f	2020-03-27 16:50:33.079+00	2020-03-30 13:29:44.155+00	\N	be48312f-af3a-454e-afd3-f6894b305985
0d04ac20-28d0-4b40-a3df-a5e937475974	\N	\N	\N	f	2020-04-03 12:58:06.148+00	2020-04-03 12:58:06.148+00	\N	a2bf350c-51a3-42cf-9323-deb7467518f8
c5da0229-80fb-4a9c-9427-9d5623893b40	\N	\N	P	f	2020-03-27 16:50:07.848+00	2020-03-30 13:30:05.489+00	\N	be48312f-af3a-454e-afd3-f6894b305985
411dea47-187d-4ea8-a6cc-d5c5bbfc63df	\N	\N	H	f	2020-03-31 05:33:30.127+00	2020-04-03 12:59:35.056+00	\N	a2bf350c-51a3-42cf-9323-deb7467518f8
7daf3566-9690-42b5-94a4-99ad129e2999	\N	\N	P	f	2020-03-27 16:50:00.156+00	2020-03-30 13:30:35.211+00	\N	be48312f-af3a-454e-afd3-f6894b305985
bce5533d-43b7-4509-86b3-72ccce692e43	\N	\N	\N	f	2020-04-02 03:04:12.681+00	2020-04-02 03:04:12.681+00	\N	a2bf350c-51a3-42cf-9323-deb7467518f8
efffd185-66b0-4110-9623-1388a7ed2b14	\N	\N	\N	f	2020-04-13 13:52:18.432+00	2020-04-13 13:52:18.432+00	\N	1b885225-2215-4098-9235-b01e6737b226
0798b9ee-95e7-4d07-aebf-85f83ecdeb01	\N	\N	P	f	2020-04-11 10:27:09.538+00	2020-04-11 10:31:21.419+00	\N	30a9c98c-ad5e-4f95-9f54-39512aebf323
6f625b73-0d8b-4b53-a693-d755c6fd404c	\N	\N	\N	f	2020-04-13 13:56:52.421+00	2020-04-13 13:56:52.421+00	\N	1b885225-2215-4098-9235-b01e6737b226
3654ff78-63cc-4236-80cf-2ac38ccbeb10	\N	\N	\N	f	2020-03-25 05:07:34.22+00	2020-03-25 05:07:34.22+00	\N	1b885225-2215-4098-9235-b01e6737b226
fea7959e-1421-4114-a5b7-8c9ddd19b287	\N	\N	A	f	2020-04-11 10:24:10.568+00	2020-04-11 10:24:27.301+00	\N	30a9c98c-ad5e-4f95-9f54-39512aebf323
72cfa7a0-b0b7-496d-9f03-94d3c0d12e9b	\N	\N	\N	f	2020-04-13 14:01:35.607+00	2020-04-13 14:01:35.607+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
9b700b34-a2f4-461a-be32-a4b4df0956e3	\N	\N	\N	f	2020-04-13 14:00:51.278+00	2020-04-13 14:00:51.278+00	\N	1b885225-2215-4098-9235-b01e6737b226
c46371ec-88fa-4c81-91f5-b963f85966a1	\N	\N	\N	f	2020-04-13 14:16:14.509+00	2020-04-13 14:16:14.509+00	\N	1b885225-2215-4098-9235-b01e6737b226
b81e9d98-3af6-4036-a7cf-bdd113dcd260	\N	\N	\N	f	2020-04-13 14:20:31.94+00	2020-04-13 14:20:31.94+00	\N	1b885225-2215-4098-9235-b01e6737b226
5af30c72-a083-4218-98d4-c6351a871e30	\N	\N	\N	f	2020-04-13 14:23:51.523+00	2020-04-13 14:23:51.523+00	\N	1b885225-2215-4098-9235-b01e6737b226
3175c441-f18b-402e-ab97-55815b24ec80	\N	\N	\N	f	2020-04-13 14:17:18.214+00	2020-04-13 14:17:18.214+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
3320fd32-fe3d-49aa-b2bd-80616b7a5204	\N	\N	\N	f	2020-04-13 14:24:33.539+00	2020-04-13 14:24:33.539+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
3dc967d0-035d-4f02-944d-7e21ef438acd	\N	\N	\N	f	2020-04-13 14:38:15.93+00	2020-04-13 14:38:15.93+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
77a0d123-c0e9-4318-b97e-4ebfc3e804fb	\N	\N	\N	f	2020-04-13 14:31:54.618+00	2020-04-13 14:31:54.618+00	\N	1b885225-2215-4098-9235-b01e6737b226
598da2c6-b582-4657-9c7d-786d4b628a5b	\N	\N	\N	f	2020-04-13 14:44:28.518+00	2020-04-13 14:44:28.518+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
6aed9e8c-3414-4d36-a62b-5f5293399561	\N	\N	\N	f	2020-04-13 14:46:24.8+00	2020-04-13 14:46:24.8+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
7d80e27d-7e50-445f-ad42-6d7eaf0078e6	\N	\N	\N	f	2020-04-13 14:43:46.781+00	2020-04-13 14:43:46.781+00	\N	1b885225-2215-4098-9235-b01e6737b226
af076a1f-7fbc-4f1e-91da-c41c04899e76	\N	\N	\N	f	2020-04-14 05:48:02.523+00	2020-04-14 09:38:53.734+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
3d87bd9a-6c5a-42dd-a9b4-f8ec156e600e	\N	\N	\N	f	2020-04-14 05:25:59.704+00	2020-04-14 09:47:30.257+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
210da2aa-332f-4a82-bbfa-52c64a3c5a93	\N	\N	\N	f	2020-04-14 09:48:52.217+00	2020-04-14 09:49:09.239+00	\N	94eb5e7c-4100-4d6e-8caa-63815eff76b6
10ee87fc-d09f-41ac-b2ed-a1cbc9c566ff	\N	\N	\N	f	2020-03-23 03:35:02.67+00	2020-03-23 03:35:02.67+00	\N	1715b788-b5b3-472d-a9cd-d17b64756181
77eebe7d-46e6-484a-a970-92c961c4259f	\N	\N	P	f	2020-03-23 03:35:02.943+00	2020-03-24 22:27:06.881+00	\N	1715b788-b5b3-472d-a9cd-d17b64756181
77b63e14-2b12-44c7-ac1a-01915c6cfb5c	\N	\N	P	f	2020-03-23 03:35:02.857+00	2020-03-30 13:39:30.314+00	\N	89134b99-2441-4e63-8852-043e0cdfb372
4f9b1bcf-56f9-426b-87ed-e295c5d6d266	\N	\N	\N	f	2020-03-20 14:07:37.48+00	2020-03-20 14:07:37.48+00	\N	1b885225-2215-4098-9235-b01e6737b226
2543bdf3-96c4-4508-b597-525742f032dd	\N	\N	\N	f	2020-03-20 14:07:37.53+00	2020-03-20 14:07:37.53+00	\N	1b885225-2215-4098-9235-b01e6737b226
ab007e13-cbd6-49b4-9efc-6a19c0602148	\N	\N	\N	f	2020-04-21 11:12:50.539+00	2020-04-21 11:12:50.539+00	d8f4be5f-d0fa-4009-a0e6-b5acc8071652	b6410c77-6c5b-4546-90e0-f8f0567c9d53
c6af0a52-24a8-440b-a31b-ad6c72d5ebc2	\N	\N	\N	f	2020-03-25 05:07:34.126+00	2020-03-25 05:07:34.126+00	\N	1715b788-b5b3-472d-a9cd-d17b64756181
0af67b7a-e399-4768-8e63-8f1d00df1a39	\N	\N	A	f	2020-03-26 01:37:01.828+00	2020-03-26 01:39:30.508+00	\N	1715b788-b5b3-472d-a9cd-d17b64756181
2dd54a4a-398f-450d-abbc-beb02b776491	\N	\N	H	f	2020-03-23 03:35:03.021+00	2020-03-24 22:27:18.369+00	\N	1715b788-b5b3-472d-a9cd-d17b64756181
6571450a-5329-4dc6-bcbf-5855d2043896	\N	\N	C	f	2020-03-23 03:35:03.022+00	2020-03-24 22:27:12.756+00	\N	1715b788-b5b3-472d-a9cd-d17b64756181
2bd090c6-b3b2-45aa-83a0-2847decc9926	\N	\N	\N	f	2020-03-25 05:07:34.186+00	2020-03-25 05:07:34.186+00	\N	4333def3-348e-4ba1-b505-ea032c1e2f0c
b2cf276b-c2ef-4514-9c79-fbecac43e31b	\N	\N	\N	f	2020-03-25 05:07:34.19+00	2020-03-25 05:07:34.19+00	\N	1bfcd4b4-59ff-4df6-825a-92b1e17f92e3
4c9fa24c-4a2c-4ebe-aeb1-0de3bb47ea04	\N	\N	\N	f	2020-03-25 05:07:34.191+00	2020-03-25 05:07:34.191+00	\N	\N
a66a832b-8d33-4a19-a890-7b8667791bc6	\N	\N	\N	f	2020-03-25 05:07:34.256+00	2020-03-25 05:07:34.256+00	\N	2272739c-7ef5-4e26-b848-17a66de0ec61
13bcc537-986d-4709-8b76-486865d7b546	\N	\N	R	f	2020-03-24 00:17:37.157+00	2020-04-08 13:54:01.036+00	\N	30a9c98c-ad5e-4f95-9f54-39512aebf323
a935ee76-3de4-4de0-9695-8ebee7691e69	\N	\N	\N	f	2020-04-12 04:51:52.335+00	2020-04-12 04:51:52.335+00	\N	1b885225-2215-4098-9235-b01e6737b226
ee18b027-a5b7-4d79-8ad3-c5ac0c522723	\N	\N	\N	f	2020-04-12 04:51:52.346+00	2020-04-12 04:51:52.346+00	\N	1b885225-2215-4098-9235-b01e6737b226
420bec29-ba07-46c0-8753-0a1987293ddf	\N	\N	\N	f	2020-04-12 04:51:52.354+00	2020-04-12 04:51:52.354+00	\N	1b885225-2215-4098-9235-b01e6737b226
52d5e953-8359-4e78-941a-d1b6a5f3339b	\N	\N	\N	f	2020-04-11 19:20:03.584+00	2020-04-11 19:20:03.584+00	\N	1b885225-2215-4098-9235-b01e6737b226
733b913c-f56c-4045-8f62-27bacde0f1aa	\N	\N	\N	f	2020-04-11 19:19:51.282+00	2020-04-11 19:19:51.282+00	\N	1b885225-2215-4098-9235-b01e6737b226
5c730c82-6a05-4d31-9089-0c4fad67bc76	\N	\N	\N	f	2020-04-12 04:51:52.374+00	2020-04-12 04:51:52.374+00	\N	1b885225-2215-4098-9235-b01e6737b226
2b34c3ae-239f-44dd-b916-29b27b758e53	\N	\N	\N	f	2020-04-11 19:19:42.434+00	2020-04-11 19:19:42.434+00	\N	1b885225-2215-4098-9235-b01e6737b226
da518a4b-4143-45cb-a379-476a760d42e1	\N	\N	\N	f	2020-04-11 19:19:57.033+00	2020-04-11 19:19:57.033+00	\N	1b885225-2215-4098-9235-b01e6737b226
ac971e00-8712-4fb7-8245-ebb72a7aa1ba	\N	\N	\N	f	2020-04-11 19:20:08.102+00	2020-04-11 19:20:08.102+00	\N	1b885225-2215-4098-9235-b01e6737b226
b91eaaec-24ff-40bd-9901-9b4b008d5d02	\N	\N	\N	f	2020-04-12 04:51:52.377+00	2020-04-12 04:51:52.377+00	\N	1b885225-2215-4098-9235-b01e6737b226
0ac5207d-ef31-4bb3-9274-35d72ec2382f	\N	\N	\N	f	2020-04-12 04:51:52.397+00	2020-04-12 04:51:52.397+00	\N	1b885225-2215-4098-9235-b01e6737b226
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY department ("depID", "deptName", "createdAt", "updatedAt", "orgID") FROM stdin;
37307be3-a964-4c2d-a76c-a0faf600b330	SALES	2019-09-24 05:12:31.253+00	2019-09-24 05:12:31.253+00	2cae037a-e70a-417a-858e-35b2737de4d9
53c5fb5e-8fc7-4380-bbdb-993b34ab8a4a	HR	2019-09-24 05:12:44.052+00	2019-09-24 05:12:44.052+00	2cae037a-e70a-417a-858e-35b2737de4d9
535d507a-e31e-48ea-9787-fa196453466b	Marketing	2019-09-24 05:13:14.549+00	2019-09-24 05:13:14.549+00	2cae037a-e70a-417a-858e-35b2737de4d9
dfd1c7a0-ce1e-450d-8ef0-483972d19251	Sales	2019-11-06 11:46:13.615+00	2019-11-06 11:46:13.615+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
4516f207-b722-4e0b-8575-633df5701e48	Finance	2019-11-06 14:37:58.682+00	2019-11-06 14:37:58.682+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
2fa95b37-86ff-467f-acca-b8730e16b2d8	HR	2019-11-11 13:25:25.164+00	2019-11-11 13:25:25.164+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
379fa685-a028-4515-afda-aa670893f942	operations	2019-11-11 13:25:30.582+00	2019-11-11 13:25:30.582+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
b89e5582-8a3f-4b3d-afa9-bc4da0f966a8	support	2019-11-11 13:25:57.124+00	2019-11-11 13:25:57.124+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
5a838386-015b-471e-92fd-b5b7e98c7581	technology	2019-11-11 13:26:37.489+00	2019-11-11 13:26:37.489+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
0aba8835-1ad4-4359-b344-b27138b0b292	admin	2019-11-15 21:57:32.448+00	2019-11-15 21:57:32.448+00	3bcf5c31-5fb1-4b19-8369-88249ccd0376
b764ec85-a234-4c80-a286-cc33c3a388d7	CEO	2019-11-15 21:59:17.135+00	2019-11-15 21:59:17.135+00	3bcf5c31-5fb1-4b19-8369-88249ccd0376
3ec925c3-9231-4f63-b413-138e40903a0c	Marketing	2019-11-15 21:59:23.818+00	2019-11-15 21:59:23.818+00	3bcf5c31-5fb1-4b19-8369-88249ccd0376
601be882-83c2-452a-9c37-95796bb10284	Sales	2019-11-15 21:59:30.975+00	2019-11-15 21:59:30.975+00	3bcf5c31-5fb1-4b19-8369-88249ccd0376
4ee3a6f8-18c0-495c-9ef4-ac6197dc7d23	admin	2019-11-29 12:05:07.607+00	2019-11-29 12:05:07.607+00	dd2416b2-6aa0-4380-94f7-0d923c14f911
0f8afc69-0ca6-44ad-b2cc-d20f76484c2d	IT	2019-11-29 12:20:07.146+00	2019-11-29 12:20:07.146+00	dd2416b2-6aa0-4380-94f7-0d923c14f911
e7bf8b26-f2eb-4578-8e48-10e23f3282ae	HR	2019-11-29 12:20:17.312+00	2019-11-29 12:20:17.312+00	dd2416b2-6aa0-4380-94f7-0d923c14f911
0290f62d-460c-4b68-b5fc-4078c829b173	IT	2019-11-29 12:20:23.993+00	2019-11-29 12:20:23.993+00	dd2416b2-6aa0-4380-94f7-0d923c14f911
a5e45f0c-b511-4c64-884d-ac39338a45bb	admin	2019-12-06 05:15:07.71+00	2019-12-06 05:15:07.71+00	0e2e7cc4-95c0-4a8d-9613-5724820c695a
62be7e14-a171-44eb-b9ab-247280183fbc	Marketing	2019-12-06 05:58:24.224+00	2019-12-06 05:58:24.224+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
030ce185-be1b-4736-87da-3bc0622f3fe5	admin	2019-12-06 06:41:41.347+00	2019-12-06 06:41:41.347+00	bfcbba2d-de04-4830-bdcd-47be6dafeff0
43dd502d-a2d6-4881-8362-8b6a142a5827	IT	2019-12-06 07:21:58.903+00	2019-12-06 07:21:58.903+00	bfcbba2d-de04-4830-bdcd-47be6dafeff0
b2c7cf5f-8157-4055-9ba9-b0e3c34ba7f4	HR	2019-12-06 07:19:40.485+00	2019-12-06 07:22:05.94+00	bfcbba2d-de04-4830-bdcd-47be6dafeff0
ddd31cff-2ebb-43b9-9127-0f8cffd7627d	Development	2019-12-06 07:22:42.18+00	2019-12-06 07:22:51.199+00	bfcbba2d-de04-4830-bdcd-47be6dafeff0
80eb862f-5806-401e-837f-3026d2be72ac	admin	2019-11-06 11:45:30.64+00	2019-12-06 08:59:35.791+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
30e28552-a7d3-4561-b33d-aac1562ddda9	sfds	2019-12-06 09:16:21.73+00	2019-12-06 09:16:21.73+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
e815fc78-7108-4f69-a419-6c884e14fc7b	dfgdfg	2019-12-06 09:17:10.589+00	2019-12-06 09:17:10.589+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
0fc7c59c-c1ce-4d3b-ac4b-aaa0f477840e	admin	2019-12-09 07:22:39.418+00	2019-12-09 07:22:39.418+00	8c17aa4d-4953-4584-9958-c6e12723a91f
a2a56f37-30d4-4a39-a3ca-34ea22e5d886	admin	2019-12-13 21:18:07.709+00	2019-12-13 21:18:07.709+00	e6d24ad4-45b2-4e55-872b-48e596604217
d35e0f4b-e95d-4c96-ad2b-8f0fc32b8435	admin	2019-12-31 16:12:02.376+00	2019-12-31 16:12:02.376+00	fefa5f82-85e7-4bfe-a88d-e62ab63ec093
9eac9e51-921e-4121-a8bc-a95954c7e334	admin	2019-12-31 16:52:05.495+00	2019-12-31 16:52:05.495+00	460c81f4-690e-4ef0-8c38-2fb496f2a4f1
b20a3c62-459b-49ed-83c4-78ca61c25827	Marketing	2019-12-31 16:55:02.415+00	2019-12-31 16:55:02.415+00	460c81f4-690e-4ef0-8c38-2fb496f2a4f1
3dfb3d99-9e81-4e2f-b405-a12cc25f8e29	Sales	2019-12-31 16:55:08.344+00	2019-12-31 16:55:08.344+00	460c81f4-690e-4ef0-8c38-2fb496f2a4f1
4b0b9ab3-87d4-4f05-8aad-4ab43e3e6dff	admin	2020-01-01 08:34:45.545+00	2020-01-01 08:34:45.545+00	d7292edf-b928-497a-a732-e7b6a437a116
8dbd085f-0d38-4cae-9d9d-de63bc5749f8	admin	2020-01-01 08:41:42.724+00	2020-01-01 08:41:42.724+00	67d2179d-8bae-481a-b9b3-02c2aba735a1
1d4b694c-f4ae-4830-9f34-0a9b5f257258	admin	2020-01-07 13:12:48.561+00	2020-01-07 13:12:48.561+00	3650e8ef-3725-42a6-8bbb-e0b9eb893d6d
bb001eb5-5fad-4de0-807f-6f11f8757cd2	Administrative	2020-01-10 18:42:58.979+00	2020-01-10 18:42:58.979+00	3bcf5c31-5fb1-4b19-8369-88249ccd0376
b5d8e6db-2e70-42ef-bc25-837eddc6178a	admin	2020-01-21 06:46:12.93+00	2020-01-21 06:46:12.93+00	fea4adf9-8e98-4c9e-92fd-1a48657a4939
59e65de3-6772-40bc-bd5d-9bbdac9d984b	development	2020-01-21 06:52:08.935+00	2020-01-21 06:52:08.935+00	fea4adf9-8e98-4c9e-92fd-1a48657a4939
d2599893-4126-4b1d-aeab-300cf3b2615a	hr	2020-01-21 06:52:17.628+00	2020-01-21 06:52:17.628+00	fea4adf9-8e98-4c9e-92fd-1a48657a4939
6721dd73-9372-4f14-922e-2ab6a62b229f	sales	2020-01-21 06:52:27.489+00	2020-01-21 06:52:27.489+00	fea4adf9-8e98-4c9e-92fd-1a48657a4939
8a3fa5eb-e3be-49d4-9316-e488b4093c2e	marketing	2020-01-21 06:55:02.866+00	2020-01-21 06:55:02.866+00	fea4adf9-8e98-4c9e-92fd-1a48657a4939
b05eab41-a422-42df-9d7f-9779deef26ae	quality	2020-01-21 07:22:01.889+00	2020-01-21 07:22:01.889+00	67d2179d-8bae-481a-b9b3-02c2aba735a1
7a9fcdde-14c9-450f-b33c-eb2a16fc8bc4	admin	2020-02-04 18:13:26.527+00	2020-02-04 18:13:26.527+00	36d01dc5-887a-4438-83de-22953e0c57f0
b9403988-6e63-4591-819b-a16eae882aa5	Barista	2020-02-04 18:23:31.002+00	2020-02-04 18:23:31.002+00	36d01dc5-887a-4438-83de-22953e0c57f0
ffc5574c-7345-41cf-a728-69faced4d6f7	Marketing	2020-02-04 18:23:45.011+00	2020-02-04 18:23:45.011+00	36d01dc5-887a-4438-83de-22953e0c57f0
4f8ba249-ec10-4233-9af9-a6bbd7ffc4bc	Coffee Roasting	2020-02-04 18:24:01.164+00	2020-02-04 18:24:01.164+00	36d01dc5-887a-4438-83de-22953e0c57f0
24af4bcd-a8ee-4c4a-9ec3-ea616a9f1d4b	Podcast	2020-02-04 18:24:10.609+00	2020-02-04 18:24:10.609+00	36d01dc5-887a-4438-83de-22953e0c57f0
d91bd1ab-e028-4932-903a-c6691d9f8fbb	Accounting	2020-02-04 18:24:26.033+00	2020-02-04 18:24:26.033+00	36d01dc5-887a-4438-83de-22953e0c57f0
1b550287-30f9-4cb5-8588-ffdf72df657a	admin	2020-02-05 12:23:08.752+00	2020-02-05 12:23:08.752+00	c9e71910-a86a-4cf4-9828-38394b5e3105
dad67b17-7771-47bc-9165-e860e756e882	hr	2020-02-06 06:59:30.056+00	2020-02-06 06:59:30.056+00	c9e71910-a86a-4cf4-9828-38394b5e3105
53e32ae5-7b61-4d95-8cd5-99ee0a5daa5a	testing	2020-02-06 06:59:38.424+00	2020-02-06 06:59:38.424+00	c9e71910-a86a-4cf4-9828-38394b5e3105
12180e49-075b-4e9d-9890-2c15c7251821	development	2020-02-06 06:59:49.019+00	2020-02-06 06:59:49.019+00	c9e71910-a86a-4cf4-9828-38394b5e3105
82477a99-20ca-46b9-8b9a-a4d4fc246160	supports	2020-02-07 06:21:45.242+00	2020-02-07 06:21:45.242+00	0a151ad5-9e51-4c0e-992f-08d81a795a0a
de7501fd-ec06-4b2b-a922-4810ecdc42f1	admin	2020-02-10 19:43:40.758+00	2020-02-10 19:43:40.758+00	8150ee17-c556-4c83-9978-564a61f5e3eb
57539c22-f935-439d-b0e4-a689c10ad7dd	Dispatch	2020-02-10 19:59:16.609+00	2020-02-10 19:59:16.609+00	8150ee17-c556-4c83-9978-564a61f5e3eb
385e5b21-971f-41b1-a6be-212c376553d9	admin	2020-02-19 18:12:39.307+00	2020-02-19 18:12:39.307+00	094ada57-aaff-48a0-ae28-d79f9898cb66
ec5eede5-74a6-48c7-af3c-8e9618ec9151	Finance	2020-02-19 22:46:42.566+00	2020-02-19 22:46:42.566+00	094ada57-aaff-48a0-ae28-d79f9898cb66
6de2b90a-204a-4621-9c32-9944f4735ac1	Customer Experience	2020-02-19 22:46:53.244+00	2020-02-19 22:46:53.244+00	094ada57-aaff-48a0-ae28-d79f9898cb66
ea9eca96-9a9d-48a9-9350-ccd0ba6c8201	Revenue	2020-02-19 22:47:01.724+00	2020-02-19 22:47:01.724+00	094ada57-aaff-48a0-ae28-d79f9898cb66
a53798b4-035d-4304-9a39-bfa1240a7eda	admin	2020-02-26 19:22:30.743+00	2020-02-26 19:22:30.743+00	f900b638-3982-4135-9743-5b75bf87e4fd
2f56e3d7-dd69-46f9-8515-f5755bdeabf6	Executive Leadership	2020-02-26 20:16:23.249+00	2020-02-26 20:16:23.249+00	f900b638-3982-4135-9743-5b75bf87e4fd
7c510ee5-2ce1-4299-a01d-9968da22514f	admin	2020-02-27 18:18:13.365+00	2020-02-27 18:18:13.365+00	beed950e-e786-4b6c-b697-4c538d01e3cb
11bd4b4c-9c6e-4616-b4b6-15abac305a7d	Product Engineering	2020-02-29 19:36:10.642+00	2020-02-29 19:36:10.642+00	094ada57-aaff-48a0-ae28-d79f9898cb66
344685b2-b3f4-4fab-9c17-315659c349d8	Engineering 	2020-03-02 20:21:44.329+00	2020-03-02 20:21:44.329+00	094ada57-aaff-48a0-ae28-d79f9898cb66
c1320795-729c-43c4-b9f7-e753427e989b	admin	2020-03-06 13:53:09.763+00	2020-03-06 13:53:09.763+00	94e99724-e67c-49d7-b626-aa7a25cadb3f
02c37f89-d11a-4a65-8264-8bfc15cb060f	admin	2020-03-06 13:54:37.353+00	2020-03-06 13:54:37.353+00	b87b7c48-0203-414f-bf97-dc261b2f12c4
39ea4177-ecd9-44e5-8529-2e9a768eb771	admin	2020-03-06 13:56:02.971+00	2020-03-06 13:56:02.971+00	692624a0-9c32-454b-923f-2c95a86473f4
86a02d20-5471-4780-ac69-cfafb542a9d5	admin	2020-03-06 13:58:13.258+00	2020-03-06 13:58:13.258+00	9d183314-41e9-4354-953f-80b15fb45021
eaa92399-f5d8-4bcc-870d-2a4a1eec5d1c	admin	2020-03-12 13:36:38.094+00	2020-03-12 13:36:38.094+00	c0165031-18eb-469f-bc72-d038427fcc97
4a58c1b1-db3f-4e3a-a523-2095e0fac60d	HR	2020-03-12 13:40:19.861+00	2020-03-12 13:40:19.861+00	c0165031-18eb-469f-bc72-d038427fcc97
cf553ced-3627-46eb-98c4-c92cb96c67f1	Sales	2020-03-12 13:40:26.614+00	2020-03-12 13:40:26.614+00	c0165031-18eb-469f-bc72-d038427fcc97
065c58d5-2a24-4572-a70f-9be927928948	Technical	2020-03-12 13:40:35.201+00	2020-03-12 13:40:35.201+00	c0165031-18eb-469f-bc72-d038427fcc97
db90330e-bdfd-455b-81ae-557b5adb2105	Finance	2020-03-16 15:41:56.402+00	2020-03-16 15:41:56.402+00	9d183314-41e9-4354-953f-80b15fb45021
29944728-6a21-45cb-8344-f5add03e69f5	Coaching	2020-03-20 14:35:10.061+00	2020-03-20 14:35:10.061+00	094ada57-aaff-48a0-ae28-d79f9898cb66
be3ec8fd-6e7a-4c34-810c-750a0f97a542	admin	2020-03-23 20:17:10.845+00	2020-03-23 20:17:10.845+00	07987f10-eb93-4bff-a78d-a20d734cba89
72c2fd4e-4571-46c5-9b28-2764c5604604	admin	2020-03-24 18:46:49.69+00	2020-03-24 18:46:49.69+00	5838acbe-14e5-4cb2-89a1-a58eebec723b
54ae61a3-cc04-4ee9-a3a2-dbd8a62b32fa	Operations	2020-03-31 17:40:18.702+00	2020-03-31 17:40:18.702+00	b87b7c48-0203-414f-bf97-dc261b2f12c4
50a0231a-ca3e-48f2-81eb-00c3b5560136	admin	2020-03-31 20:35:56.844+00	2020-03-31 20:35:56.844+00	56f0c396-78e1-4e97-8999-16a4adf57256
60212bba-9fc2-498a-a2a8-ffdf44a5c54d	admin	2020-04-02 20:05:46.142+00	2020-04-02 20:05:46.142+00	78732a87-303f-4b58-ae79-114978d4a872
3d9b964a-4c2a-4096-9e40-fd403a06f5cc	admin	2020-04-03 21:00:11.018+00	2020-04-03 21:00:11.018+00	38fd946f-3f48-47d7-abe4-6c79d2890672
e0f2700e-a437-4cf0-9c4c-5f2da3f75567	admin	2020-04-03 21:02:10.818+00	2020-04-03 21:02:10.818+00	97d9d640-88f2-4cd0-a523-810d390e11db
f28629d2-7570-407e-9009-2e10b5bb70a7	admin	2020-04-06 05:10:59.046+00	2020-04-06 05:10:59.046+00	f220eb5e-9275-442d-8d8e-084c114ed277
414017fd-cf7f-4ee8-9510-a2a3e1143d08	admin	2020-04-06 12:54:14.959+00	2020-04-06 12:54:14.959+00	c8f55fab-026c-49ff-9082-be8b9b0ba839
4b0171e2-6bae-4aee-8747-02c2b6c3571e	Executive Leadership	2020-04-06 13:56:01.918+00	2020-04-06 13:56:01.918+00	c8f55fab-026c-49ff-9082-be8b9b0ba839
7710237f-9baf-42fc-9c0f-144eec9f3127	Operations	2020-04-06 14:32:31.128+00	2020-04-06 14:32:31.128+00	97d9d640-88f2-4cd0-a523-810d390e11db
c1bc44a9-603d-4777-a269-8666f5df79e3	admin	2020-04-07 13:03:07.549+00	2020-04-07 13:03:07.549+00	6499b1b3-46f1-490f-9530-7ed128753ef8
e87b8084-ff82-4983-9ea1-43c88cce7e65	admin	2020-04-07 19:43:41.085+00	2020-04-07 19:43:41.085+00	74a52879-bb1b-401a-9562-527fa1e08569
826f7670-40a2-4be6-9f5b-79d5aa1a7f90	admin	2020-04-07 19:44:31.487+00	2020-04-07 19:44:31.487+00	8f604868-3bf7-4f34-a135-60aaf8fc35ce
0efde6b6-bf44-4536-9b9a-93bedf5988db	Operations	2020-04-07 19:46:39.189+00	2020-04-07 19:46:39.189+00	74a52879-bb1b-401a-9562-527fa1e08569
37b7054c-32e8-4955-afaa-595411391a35	Marketing	2020-04-07 19:46:50.365+00	2020-04-07 19:46:50.365+00	74a52879-bb1b-401a-9562-527fa1e08569
e8d53017-8805-4c72-a39b-d55762727008	Sales	2020-04-07 19:46:58.698+00	2020-04-07 19:46:58.698+00	74a52879-bb1b-401a-9562-527fa1e08569
8326f405-bf95-4ab5-98e1-818dd102be19	admin	2020-04-09 17:43:48.033+00	2020-04-09 17:43:48.033+00	d4ccbc4d-b78d-4b69-a289-0829ed40530d
2ff151ca-21c8-432f-b86f-73b77eb2e49a	Marketing	2020-04-10 16:51:18.948+00	2020-04-10 16:51:18.948+00	78732a87-303f-4b58-ae79-114978d4a872
d0a68ce8-224d-44de-8261-2d997df5f430	Mentorship	2020-04-13 18:38:49.068+00	2020-04-13 18:38:49.068+00	36d01dc5-887a-4438-83de-22953e0c57f0
8d9f641f-8813-4c3e-9326-b12f717b32f1	Finance	2020-04-17 20:56:14.872+00	2020-04-17 20:56:14.872+00	97d9d640-88f2-4cd0-a523-810d390e11db
\.


--
-- Data for Name: deviceregister; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY deviceregister ("depID", "secretKey", "createdAt", "updatedAt", "uID") FROM stdin;
e49042d5-28b2-4da6-b844-0cd3eba2d23b	"dRS6EXm72GA:APA91bEqoSHkS4T9c0KG7RWLx2XVHt11X6rg_RJ2vqI4fWBWCXHwfoyebuIiY_J7gxed8unDtaE56p4TZuz-9d0q1jRPmBiCibZ_NFMETsZEikLMyPOY-xvM54mmLCNUnJ3MSuC4yje6"	2020-03-16 13:47:49.685+00	2020-03-16 13:47:49.685+00	1b885225-2215-4098-9235-b01e6737b226
22f2a8e4-1049-48f0-8e9e-897fb4c665aa	"dRS6EXm72GA:APA91bEqoSHkS4T9c0KG7RWLx2XVHt11X6rg_RJ2vqI4fWBWCXHwfoyebuIiY_J7gxed8unDtaE56p4TZuz-9d0q1jRPmBiCibZ_NFMETsZEikLMyPOY-xvM54mmLCNUnJ3MSuC4yje6"	2020-03-16 13:47:49.696+00	2020-03-16 13:47:49.696+00	1b885225-2215-4098-9235-b01e6737b226
e1229290-e0ad-400a-a796-831f5aacf665	{"endpoint":"https://fcm.googleapis.com/fcm/send/derdW2pQe8Q:APA91bFQ8ueIXgZH04J98Waq7-a67CchW3bJecGFZ1-blo_CNz2-ekaYk0IKPgZjplYJ-aO9avnWvUkg35DaT3yJK58HFwKZHMssJzPiAqrsM7u3VYxDJ0iXrFsDNjKX5sCMfXhrR3wn","expirationTime":null,"keys":{"p256dh":"BKvSBj9dO_5MiksbJBaB14eNx01FUsYpz7ZVVjctH2ulhe0go3gGF0pge1NQjBS4F55Kj2_MAszZN4fHJ6AfaFg","auth":"oitwqtuubWqBwiXNeCifJg"}}	2020-03-16 13:59:08.675+00	2020-03-16 13:59:08.675+00	1b885225-2215-4098-9235-b01e6737b226
ab3563a7-143c-44ea-9352-4afcfd659419	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:31:06.049+00	2020-03-16 15:31:06.049+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
301440ce-d4ff-495d-9a96-00ffdd8c01e3	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:32:28.017+00	2020-03-16 15:32:28.017+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
79d5a63b-fe33-412b-8660-5a55adf8e21f	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:32:44.19+00	2020-03-16 15:32:44.19+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
0e2dd8f4-1ddd-41d8-9de4-60e3e3a68871	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:32:58.903+00	2020-03-16 15:32:58.903+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
6198de67-abac-4a84-adfb-b6b5f569cc65	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:33:17.439+00	2020-03-16 15:33:17.439+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
f885d5dd-04d4-441d-8720-a8975bd55dd2	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:34:15.345+00	2020-03-16 15:34:15.345+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
373ffcce-c0fb-4a95-9861-680dbb841557	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:35:15.339+00	2020-03-16 15:35:15.339+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
428e7f42-1059-4b43-a88b-e84701a300ab	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:35:51.807+00	2020-03-16 15:35:51.807+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
8ba3a1f2-7418-4bb3-a5a0-401ca0d8cabd	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:36:03.784+00	2020-03-16 15:36:03.784+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
53807e80-0a91-4aaf-b052-f3dc944d8460	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:36:29.495+00	2020-03-16 15:36:29.495+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
5e364a5a-7968-4e53-beab-cb5b8732f75c	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 15:37:17.697+00	2020-03-16 15:37:17.697+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
dccddc82-87d2-491f-9c9f-642760714855	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 16:04:05.476+00	2020-03-16 16:04:05.476+00	ca46ad0c-2fcb-45d7-becf-d19fcd29f97b
4da13005-1a9d-47b3-bc7a-9202ec0febef	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 21:20:20.527+00	2020-03-16 21:20:20.527+00	ca46ad0c-2fcb-45d7-becf-d19fcd29f97b
584fba67-304c-4a23-8a6a-a4f9fa9ab07d	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-16 21:38:42.528+00	2020-03-16 21:38:42.528+00	ca46ad0c-2fcb-45d7-becf-d19fcd29f97b
af5f19da-6852-46fd-83b1-fcb09f6b1999	"eW7tyCLUdko:APA91bHggDXyKheVtbe3ozYvweSalrij884tcZoPL7fmU1KU8earlPJxD87R7N3RBR-GGTqgT6r2FY2RnjqJbBJ6isFwKD6TEyXW3uuDoki2kqk9nHuC_ukk_UexdbeiU0lt7MKIJ5j5"	2020-03-17 01:22:05.935+00	2020-03-17 01:22:05.935+00	be48312f-af3a-454e-afd3-f6894b305985
03002be9-f401-46d1-9643-7e2b0c01b9c9	"dRS6EXm72GA:APA91bEqoSHkS4T9c0KG7RWLx2XVHt11X6rg_RJ2vqI4fWBWCXHwfoyebuIiY_J7gxed8unDtaE56p4TZuz-9d0q1jRPmBiCibZ_NFMETsZEikLMyPOY-xvM54mmLCNUnJ3MSuC4yje6"	2020-03-17 05:43:17.982+00	2020-03-17 05:43:17.982+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
b0033b79-08ce-4e82-b2a6-6e1a1e247cba	"dRS6EXm72GA:APA91bEqoSHkS4T9c0KG7RWLx2XVHt11X6rg_RJ2vqI4fWBWCXHwfoyebuIiY_J7gxed8unDtaE56p4TZuz-9d0q1jRPmBiCibZ_NFMETsZEikLMyPOY-xvM54mmLCNUnJ3MSuC4yje6"	2020-03-17 05:43:18.023+00	2020-03-17 05:43:18.023+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
3c928bc5-fb86-49ab-8139-1281b0ba50f5	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 05:25:04.646+00	2020-03-18 05:25:04.646+00	1b885225-2215-4098-9235-b01e6737b226
2e1a6da4-70c1-4aeb-877e-db7c8b07904b	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 05:25:04.657+00	2020-03-18 05:25:04.657+00	1b885225-2215-4098-9235-b01e6737b226
d7e237b5-ebdc-46fd-8989-3e41831863df	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 06:53:30.598+00	2020-03-18 06:53:30.598+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
d016acef-8414-47be-8b6e-e79064bbf5b0	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 06:53:30.617+00	2020-03-18 06:53:30.617+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
917a3f26-ff11-4250-af7c-f8883b8a9bc5	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 07:10:36.738+00	2020-03-18 07:10:36.738+00	1b885225-2215-4098-9235-b01e6737b226
df6528a7-2907-4d62-8611-1480c36b0a52	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 07:10:36.748+00	2020-03-18 07:10:36.748+00	1b885225-2215-4098-9235-b01e6737b226
5bfc06eb-2759-4bfc-95c9-9741314718a1	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 13:58:36.444+00	2020-03-18 13:58:36.444+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
10e97294-a25e-4ce3-bae1-c0b18e0d5907	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-18 13:58:36.503+00	2020-03-18 13:58:36.503+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
02b34d67-3148-421f-b693-6995269c4269	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-19 09:21:46.723+00	2020-03-19 09:21:46.723+00	1b885225-2215-4098-9235-b01e6737b226
1bdf4e90-268d-4e9c-b268-2176d0b7e717	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-19 09:21:46.765+00	2020-03-19 09:21:46.765+00	1b885225-2215-4098-9235-b01e6737b226
394344ab-6195-4b61-889c-b67ce153de53	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-19 09:47:04.986+00	2020-03-19 09:47:04.986+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
2267d1e9-a11b-43db-88f6-67a3d860b472	"fYmSpqzvs5A:APA91bEG-cJzdMrypPAD1CFjDzbEXJ4yMgoHMppTc5aSF551twcWo2rQeW0A6CEYQ3jbVgfT6sqP-9c_ws-wFpeJY6t7RGhh3m1Y4QQP5Br86DpolNuRV9MaAgLAMSSvyfy-VuiutCiF"	2020-03-19 09:47:05.015+00	2020-03-19 09:47:05.015+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
649077e9-1261-4f34-9ee2-faecb6f1b387	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-19 19:36:12.053+00	2020-03-19 19:36:12.053+00	ca46ad0c-2fcb-45d7-becf-d19fcd29f97b
807227e0-a2c8-4f45-9510-111e0b4b7005	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-19 19:36:24.921+00	2020-03-19 19:36:24.921+00	ca46ad0c-2fcb-45d7-becf-d19fcd29f97b
418aeee5-7bc0-48f5-9883-edaa926b1f4b	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeZAx_1KiKc6Y67HaNz7cP2NEpd3vNgRlqxTW9-b5dvYD-2lhLlt_IypTDhVJT4iWzdivBZdbCeYO43Z7ukXYfwWaKz58v9Vn9PHsxXhzIYsBcqDHDCLWlg-NS3CRWKQAWY_CgBh60-WzsyohYrgHMPqsLVd3nQuN5z_4PgHO8X5Qr5WU","keys":{"auth":"gDIM2ihoxZxrgb_xnv2P6w","p256dh":"BBekYH1144bMBN4WI19qLTC6wNUtEGwsF5A6p8U9z2KN-px5v_PeZNo-ZMOSnQ_24zSYukL2M2xvLTndVeB9W8g"}}	2020-03-19 19:36:35.791+00	2020-03-19 19:36:35.791+00	ca46ad0c-2fcb-45d7-becf-d19fcd29f97b
dced18a0-4026-4fe5-8a49-225c8b62d0b6	"eW7tyCLUdko:APA91bHggDXyKheVtbe3ozYvweSalrij884tcZoPL7fmU1KU8earlPJxD87R7N3RBR-GGTqgT6r2FY2RnjqJbBJ6isFwKD6TEyXW3uuDoki2kqk9nHuC_ukk_UexdbeiU0lt7MKIJ5j5"	2020-03-20 20:40:36.386+00	2020-03-20 20:40:36.386+00	be48312f-af3a-454e-afd3-f6894b305985
15cfeb2d-960e-4f03-a9ab-98ff8b053976	"eW7tyCLUdko:APA91bHggDXyKheVtbe3ozYvweSalrij884tcZoPL7fmU1KU8earlPJxD87R7N3RBR-GGTqgT6r2FY2RnjqJbBJ6isFwKD6TEyXW3uuDoki2kqk9nHuC_ukk_UexdbeiU0lt7MKIJ5j5"	2020-03-20 20:40:36.454+00	2020-03-20 20:40:36.454+00	be48312f-af3a-454e-afd3-f6894b305985
088ff2bc-8134-4dbc-9eff-208ccbfc01aa	"deXTg76ieFo:APA91bFdtE4hgS500hc3xsPBGCf3rH4yEAdNrAIH41P-OIEXo8xJTra_iaaPWSsLXwqcwk8Gph-zwCH9xrue7rZ08ZHpehvDUQopBQP12ZhLQpDUYHHfY6SVvNpgku_FFayWzyIAQbyL"	2020-03-23 04:14:50.95+00	2020-03-23 04:14:50.95+00	89134b99-2441-4e63-8852-043e0cdfb372
9fb6134b-5a74-4cdd-b720-f9893aa3f9dc	"deXTg76ieFo:APA91bFdtE4hgS500hc3xsPBGCf3rH4yEAdNrAIH41P-OIEXo8xJTra_iaaPWSsLXwqcwk8Gph-zwCH9xrue7rZ08ZHpehvDUQopBQP12ZhLQpDUYHHfY6SVvNpgku_FFayWzyIAQbyL"	2020-03-23 04:14:51.102+00	2020-03-23 04:14:51.102+00	89134b99-2441-4e63-8852-043e0cdfb372
cdb714b0-f82c-43e0-9e92-497e5ce36de0	"deXTg76ieFo:APA91bFdtE4hgS500hc3xsPBGCf3rH4yEAdNrAIH41P-OIEXo8xJTra_iaaPWSsLXwqcwk8Gph-zwCH9xrue7rZ08ZHpehvDUQopBQP12ZhLQpDUYHHfY6SVvNpgku_FFayWzyIAQbyL"	2020-03-23 04:15:28.289+00	2020-03-23 04:15:28.289+00	89134b99-2441-4e63-8852-043e0cdfb372
15c2da00-1c04-4719-b09c-28d7c1725c4c	"eW7tyCLUdko:APA91bHggDXyKheVtbe3ozYvweSalrij884tcZoPL7fmU1KU8earlPJxD87R7N3RBR-GGTqgT6r2FY2RnjqJbBJ6isFwKD6TEyXW3uuDoki2kqk9nHuC_ukk_UexdbeiU0lt7MKIJ5j5"	2020-03-24 22:27:03.275+00	2020-03-24 22:27:03.275+00	1715b788-b5b3-472d-a9cd-d17b64756181
dda1b672-616a-4203-b1da-98a50f3afaae	"eW7tyCLUdko:APA91bHggDXyKheVtbe3ozYvweSalrij884tcZoPL7fmU1KU8earlPJxD87R7N3RBR-GGTqgT6r2FY2RnjqJbBJ6isFwKD6TEyXW3uuDoki2kqk9nHuC_ukk_UexdbeiU0lt7MKIJ5j5"	2020-03-24 22:27:03.29+00	2020-03-24 22:27:03.29+00	1715b788-b5b3-472d-a9cd-d17b64756181
3701a946-1d24-4dae-8b8f-94fa14a2a298	"deXTg76ieFo:APA91bFdtE4hgS500hc3xsPBGCf3rH4yEAdNrAIH41P-OIEXo8xJTra_iaaPWSsLXwqcwk8Gph-zwCH9xrue7rZ08ZHpehvDUQopBQP12ZhLQpDUYHHfY6SVvNpgku_FFayWzyIAQbyL"	2020-03-26 00:16:27.052+00	2020-03-26 00:16:27.052+00	89134b99-2441-4e63-8852-043e0cdfb372
379f2e8b-0db8-42a9-b7c4-341b682f9fb4	"eW7tyCLUdko:APA91bHggDXyKheVtbe3ozYvweSalrij884tcZoPL7fmU1KU8earlPJxD87R7N3RBR-GGTqgT6r2FY2RnjqJbBJ6isFwKD6TEyXW3uuDoki2kqk9nHuC_ukk_UexdbeiU0lt7MKIJ5j5"	2020-03-26 02:04:11.12+00	2020-03-26 02:04:11.12+00	be48312f-af3a-454e-afd3-f6894b305985
375e1384-acfb-4e7d-9aa8-943cdac05fa1	"eW7tyCLUdko:APA91bHggDXyKheVtbe3ozYvweSalrij884tcZoPL7fmU1KU8earlPJxD87R7N3RBR-GGTqgT6r2FY2RnjqJbBJ6isFwKD6TEyXW3uuDoki2kqk9nHuC_ukk_UexdbeiU0lt7MKIJ5j5"	2020-03-26 02:04:11.159+00	2020-03-26 02:04:11.159+00	be48312f-af3a-454e-afd3-f6894b305985
b3f7cef8-12cb-4182-97e8-257266aab839	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:28:50.221+00	2020-03-27 16:28:50.221+00	be48312f-af3a-454e-afd3-f6894b305985
1508d348-288c-4e68-8183-a095b4a928a6	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:29:10.445+00	2020-03-27 16:29:10.445+00	be48312f-af3a-454e-afd3-f6894b305985
d29ea93e-4a8c-4053-8261-a2ac8e036cd9	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:29:20.628+00	2020-03-27 16:29:20.628+00	be48312f-af3a-454e-afd3-f6894b305985
7d9590f8-342f-4a74-933d-0b9ce428bd3f	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:31:50.595+00	2020-03-27 16:31:50.595+00	be48312f-af3a-454e-afd3-f6894b305985
97723e8f-e29c-42b9-bd24-64070f1fd9a5	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:33:27.139+00	2020-03-27 16:33:27.139+00	be48312f-af3a-454e-afd3-f6894b305985
2cff94de-9089-405b-bc5f-e56a1847d5ce	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:33:35.6+00	2020-03-27 16:33:35.6+00	be48312f-af3a-454e-afd3-f6894b305985
2ba07436-f53a-4dfd-bec3-88e2d0e10f8d	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:33:47.759+00	2020-03-27 16:33:47.759+00	be48312f-af3a-454e-afd3-f6894b305985
db8a40dc-a267-4008-8448-5b64fda525de	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:34:38.744+00	2020-03-27 16:34:38.744+00	be48312f-af3a-454e-afd3-f6894b305985
6bcbeee8-961e-4610-9a4c-a353149ef941	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-27 16:55:47.587+00	2020-03-27 16:55:47.587+00	be48312f-af3a-454e-afd3-f6894b305985
3250e9d0-2d88-402d-b04c-51f03e9f1f8f	"deXTg76ieFo:APA91bFdtE4hgS500hc3xsPBGCf3rH4yEAdNrAIH41P-OIEXo8xJTra_iaaPWSsLXwqcwk8Gph-zwCH9xrue7rZ08ZHpehvDUQopBQP12ZhLQpDUYHHfY6SVvNpgku_FFayWzyIAQbyL"	2020-03-30 13:36:14.182+00	2020-03-30 13:36:14.182+00	89134b99-2441-4e63-8852-043e0cdfb372
b012f80e-fb1e-45d1-be48-f46a570b3a4b	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-03-30 13:43:39.855+00	2020-03-30 13:43:39.855+00	a2bf350c-51a3-42cf-9323-deb7467518f8
83812f4d-0ef4-46a9-9f28-e366f113884f	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-30 13:56:20.018+00	2020-03-30 13:56:20.018+00	be48312f-af3a-454e-afd3-f6894b305985
8e545486-d95b-4f66-81ab-95b01c320aed	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-30 14:03:41.448+00	2020-03-30 14:03:41.448+00	be48312f-af3a-454e-afd3-f6894b305985
07f50370-19b6-4026-8d7d-eb1b19db5bed	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-30 15:16:43.78+00	2020-03-30 15:16:43.78+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
9ad9b8bc-c4ef-4261-a68d-074650078015	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-30 15:17:27.016+00	2020-03-30 15:17:27.016+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
8d0b2f3a-d4fd-4916-b52e-dc64a0255d9d	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-30 18:02:03.552+00	2020-03-30 18:02:03.552+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
581f5182-cfec-472a-a1df-55ece1c6ad4a	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-31 17:56:08.008+00	2020-03-31 17:56:08.008+00	be48312f-af3a-454e-afd3-f6894b305985
5a47bd67-a832-4a7c-a219-c261440caa49	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-03-31 20:24:40.515+00	2020-03-31 20:24:40.515+00	be48312f-af3a-454e-afd3-f6894b305985
53a1637e-5c93-43cc-b293-1c068dcd15b5	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-01 13:10:14.626+00	2020-04-01 13:10:14.626+00	a2bf350c-51a3-42cf-9323-deb7467518f8
dde5e201-9396-407c-892b-1e0e18754ff0	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-01 13:10:20.832+00	2020-04-01 13:10:20.832+00	a2bf350c-51a3-42cf-9323-deb7467518f8
5d9ff2ba-67da-40d9-af97-b579c9177a5f	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-01 13:43:28.146+00	2020-04-01 13:43:28.146+00	a2bf350c-51a3-42cf-9323-deb7467518f8
ef386ff2-45f4-4ad9-84ce-38fa8b6a2722	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-04-01 14:11:27.537+00	2020-04-01 14:11:27.537+00	be48312f-af3a-454e-afd3-f6894b305985
e91b99e1-471d-44fe-b752-5049c39989e7	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-04-01 16:01:17.409+00	2020-04-01 16:01:17.409+00	1715b788-b5b3-472d-a9cd-d17b64756181
4d76cdff-105e-4afd-967b-72b1b6a00292	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-04-02 20:14:26.318+00	2020-04-02 20:14:26.318+00	899e4a90-56c3-4878-ad45-4d2213abfca7
eae4cce0-1b93-40dc-b143-b4d324104ca8	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-04-02 20:20:02.769+00	2020-04-02 20:20:02.769+00	899e4a90-56c3-4878-ad45-4d2213abfca7
ccfc460f-6854-42db-9a47-1949ce004f36	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-03 12:55:37.52+00	2020-04-03 12:55:37.52+00	a2bf350c-51a3-42cf-9323-deb7467518f8
939c9653-fc44-4162-bb93-34e45d250332	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-03 12:55:43.332+00	2020-04-03 12:55:43.332+00	a2bf350c-51a3-42cf-9323-deb7467518f8
ac00ba64-492e-4be7-b91d-a21b8853b8ac	"deXTg76ieFo:APA91bFdtE4hgS500hc3xsPBGCf3rH4yEAdNrAIH41P-OIEXo8xJTra_iaaPWSsLXwqcwk8Gph-zwCH9xrue7rZ08ZHpehvDUQopBQP12ZhLQpDUYHHfY6SVvNpgku_FFayWzyIAQbyL"	2020-04-03 13:18:35.408+00	2020-04-03 13:18:35.408+00	89134b99-2441-4e63-8852-043e0cdfb372
f37beca9-6fcc-428e-a07f-2569182d2da6	"deXTg76ieFo:APA91bFdtE4hgS500hc3xsPBGCf3rH4yEAdNrAIH41P-OIEXo8xJTra_iaaPWSsLXwqcwk8Gph-zwCH9xrue7rZ08ZHpehvDUQopBQP12ZhLQpDUYHHfY6SVvNpgku_FFayWzyIAQbyL"	2020-04-03 13:20:39.799+00	2020-04-03 13:20:39.799+00	89134b99-2441-4e63-8852-043e0cdfb372
afc2d928-8260-4fae-b232-aec23520c4c4	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-04-03 13:42:23.75+00	2020-04-03 13:42:23.75+00	89134b99-2441-4e63-8852-043e0cdfb372
90469abc-2f40-4cb0-87d0-35788b31a196	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-04-03 19:25:17.615+00	2020-04-03 19:25:17.615+00	be48312f-af3a-454e-afd3-f6894b305985
d6010040-519c-4ffe-ab1b-027ca4eb6030	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABefinCbctCCqIgIemvB_i-xyMFTyHE-ABUTcOXQPdPaaR-PnSxWqShfSc4ZGFPpKjxa8ShWJALQ3Pz1wceLAZRufk1GmEO_HT1TGnwvGoejKVqAIRjIko6xeiylu85QyCbOETldNwMtns4K5lsdlez7TUg_mpGnQLjNtKjPBeO2vlSlI8","keys":{"auth":"3iuP9NMd6YvMm6aWLPQutQ","p256dh":"BNr6St_2K1Zdg06x6IlLuRPPvZrSix-JSFXhR8E-DxggHl_cpT4GGDnn9rZqM3InbwgAIuEmTgAto0LxRdaOrjA"}}	2020-04-03 21:14:39.813+00	2020-04-03 21:14:39.813+00	be48312f-af3a-454e-afd3-f6894b305985
b5092f3f-e838-47d4-9d65-9c600d4711b8	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-06 13:10:05.203+00	2020-04-06 13:10:05.203+00	a2bf350c-51a3-42cf-9323-deb7467518f8
3cbe3cfe-aca7-40c4-b8bb-0a6b1eb7bd86	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-06 13:19:21.996+00	2020-04-06 13:19:21.996+00	a2bf350c-51a3-42cf-9323-deb7467518f8
e8c43d20-180c-4d33-8981-2a4d9c7fc5b5	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-06 13:19:37.182+00	2020-04-06 13:19:37.182+00	a2bf350c-51a3-42cf-9323-deb7467518f8
2f12693e-75a4-41bb-a809-537f6b21c6e8	"cBHDsFJEsBI:APA91bHf5Pwd76cEprh3CJMFNTW4N6MVGqUYOTo-e_iT6GDajClyPcgStznBQ3k0RBMUd-_atWweGcYMIJVjEnlQ3lpyXzzCINpt_gWbBJPsQMaEp-nMpxFBcTwVFTVB6z2uKT0sjEd3"	2020-04-06 13:20:00.958+00	2020-04-06 13:20:00.958+00	a2bf350c-51a3-42cf-9323-deb7467518f8
602e9767-cf61-4ec7-b8a3-524993376fb2	"e2EQjQ43nH8:APA91bGGL-bUDg9UR-MpST98xNJm7QgBTvZDWcWqNcmG4vwWt1HY-lrLzf0LYErMcOQ7E8NSOyns43vwIHIrclNlEvoKTRAo2tM4nQ3xCt01O5H73AHiM57Z6f9zJvOGun2pya6Qp83w"	2020-04-06 13:50:02.126+00	2020-04-06 13:50:02.126+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
f91fb78a-09bd-4291-959a-8f6ba035dad0	"e2EQjQ43nH8:APA91bGGL-bUDg9UR-MpST98xNJm7QgBTvZDWcWqNcmG4vwWt1HY-lrLzf0LYErMcOQ7E8NSOyns43vwIHIrclNlEvoKTRAo2tM4nQ3xCt01O5H73AHiM57Z6f9zJvOGun2pya6Qp83w"	2020-04-06 13:50:02.162+00	2020-04-06 13:50:02.162+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
6ca12ac5-cc09-4367-bf31-b3acffc74af2	"fNjD9QWENP0:APA91bFwQTZftl2iqQGWoMIuf-NGwrOKxzsEbK2Fw57cHqeXyFLKdlXjP3V2PZiU92uVIIqz6msL27osznNb9fppMBK1yp9721V6jI7BORCBvP0P1BTLXza2il5MNhotFbiuF42RJRK8"	2020-04-06 13:50:10.429+00	2020-04-06 13:50:10.429+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
6765a108-c389-43e4-a66c-f8df9818b800	"fNjD9QWENP0:APA91bFwQTZftl2iqQGWoMIuf-NGwrOKxzsEbK2Fw57cHqeXyFLKdlXjP3V2PZiU92uVIIqz6msL27osznNb9fppMBK1yp9721V6jI7BORCBvP0P1BTLXza2il5MNhotFbiuF42RJRK8"	2020-04-06 13:50:10.47+00	2020-04-06 13:50:10.47+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
ddced202-da33-425c-a616-b1d23341238b	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-06 18:48:32.044+00	2020-04-06 18:48:32.044+00	75861c88-70f9-4070-8970-7fd58237aa1a
4cc39b43-1fd2-458c-a4c4-ca681aa5a247	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-06 18:54:19.26+00	2020-04-06 18:54:19.26+00	75861c88-70f9-4070-8970-7fd58237aa1a
4b589822-8052-447d-ad36-f7457bb77e68	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-06 18:54:28.458+00	2020-04-06 18:54:28.458+00	75861c88-70f9-4070-8970-7fd58237aa1a
53f3a2d5-16f6-4cce-9209-4adf3d77f961	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-06 18:54:37.164+00	2020-04-06 18:54:37.164+00	75861c88-70f9-4070-8970-7fd58237aa1a
1b9b33b7-2074-44d5-b8f8-e3e79c9be9b1	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-06 18:54:52.971+00	2020-04-06 18:54:52.971+00	75861c88-70f9-4070-8970-7fd58237aa1a
68e2ccb7-3087-4905-bf7a-c0e2d318848c	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-07 14:01:59.37+00	2020-04-07 14:01:59.37+00	be48312f-af3a-454e-afd3-f6894b305985
440874a7-6901-4e2d-9221-450dd7ebc49d	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-07 21:01:51.868+00	2020-04-07 21:01:51.868+00	be48312f-af3a-454e-afd3-f6894b305985
cc333b78-1b37-492a-855a-dd0fa996c90e	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-08 21:06:59.678+00	2020-04-08 21:06:59.678+00	78591a37-3a60-4acc-87fd-58d161dc4135
39f6b109-9789-476a-9e48-1bae2945192b	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-08 21:08:13.419+00	2020-04-08 21:08:13.419+00	78591a37-3a60-4acc-87fd-58d161dc4135
2e891be6-1e09-440b-b80a-8c42f51f2103	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-08 21:08:33.012+00	2020-04-08 21:08:33.012+00	78591a37-3a60-4acc-87fd-58d161dc4135
a62999f1-f1e8-4777-b3c1-34aca0b75ac2	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-09 16:59:39.331+00	2020-04-09 16:59:39.331+00	be48312f-af3a-454e-afd3-f6894b305985
7dc09520-ab73-4921-a134-cec1e4772a76	{"endpoint":"https://fcm.googleapis.com/fcm/send/cgRhSxUWT7A:APA91bHcQ4bcmcocu8tDlpdwTIcAlvrjeB9vs7F6wTMsULCjBafIKTiCiN5NPLj0fZ0IaxZ3LCcNwDNI6NxRSCI5h30FYG8zD3HnPm0h1FVmeMjW_Oge_qU1b6kRT38UwoycKAcSLO4i","expirationTime":null,"keys":{"p256dh":"BGJZc90Pp2ufA3kOzYitKHrCZ0pID3tbh54VcIz9I2jasV9w-9dQtwJ1Lg8d96oQmTwY7JkwnTIV9ocOk9nmV6E","auth":"ACnN8VwAtSBEBlPUbrCDdA"}}	2020-04-10 15:28:18.158+00	2020-04-10 15:28:18.158+00	899e4a90-56c3-4878-ad45-4d2213abfca7
e7a70572-880d-48e0-8866-d7c2a398ef44	{"endpoint":"https://fcm.googleapis.com/fcm/send/cgRhSxUWT7A:APA91bHcQ4bcmcocu8tDlpdwTIcAlvrjeB9vs7F6wTMsULCjBafIKTiCiN5NPLj0fZ0IaxZ3LCcNwDNI6NxRSCI5h30FYG8zD3HnPm0h1FVmeMjW_Oge_qU1b6kRT38UwoycKAcSLO4i","expirationTime":null,"keys":{"p256dh":"BGJZc90Pp2ufA3kOzYitKHrCZ0pID3tbh54VcIz9I2jasV9w-9dQtwJ1Lg8d96oQmTwY7JkwnTIV9ocOk9nmV6E","auth":"ACnN8VwAtSBEBlPUbrCDdA"}}	2020-04-10 15:29:16.474+00	2020-04-10 15:29:16.474+00	899e4a90-56c3-4878-ad45-4d2213abfca7
d1b9a00a-d0cf-41fb-908a-71f166f44b5b	{"endpoint":"https://fcm.googleapis.com/fcm/send/cgRhSxUWT7A:APA91bHcQ4bcmcocu8tDlpdwTIcAlvrjeB9vs7F6wTMsULCjBafIKTiCiN5NPLj0fZ0IaxZ3LCcNwDNI6NxRSCI5h30FYG8zD3HnPm0h1FVmeMjW_Oge_qU1b6kRT38UwoycKAcSLO4i","expirationTime":null,"keys":{"p256dh":"BGJZc90Pp2ufA3kOzYitKHrCZ0pID3tbh54VcIz9I2jasV9w-9dQtwJ1Lg8d96oQmTwY7JkwnTIV9ocOk9nmV6E","auth":"ACnN8VwAtSBEBlPUbrCDdA"}}	2020-04-10 15:30:04.034+00	2020-04-10 15:30:04.034+00	899e4a90-56c3-4878-ad45-4d2213abfca7
6183b276-2c65-437e-9ce8-d9ecddd03349	{"endpoint":"https://fcm.googleapis.com/fcm/send/cgRhSxUWT7A:APA91bHcQ4bcmcocu8tDlpdwTIcAlvrjeB9vs7F6wTMsULCjBafIKTiCiN5NPLj0fZ0IaxZ3LCcNwDNI6NxRSCI5h30FYG8zD3HnPm0h1FVmeMjW_Oge_qU1b6kRT38UwoycKAcSLO4i","expirationTime":null,"keys":{"p256dh":"BGJZc90Pp2ufA3kOzYitKHrCZ0pID3tbh54VcIz9I2jasV9w-9dQtwJ1Lg8d96oQmTwY7JkwnTIV9ocOk9nmV6E","auth":"ACnN8VwAtSBEBlPUbrCDdA"}}	2020-04-10 15:34:00.179+00	2020-04-10 15:34:00.179+00	899e4a90-56c3-4878-ad45-4d2213abfca7
e74923bd-7d5f-45b4-8a1c-eb9c36ec86cb	{"endpoint":"https://fcm.googleapis.com/fcm/send/cgRhSxUWT7A:APA91bHcQ4bcmcocu8tDlpdwTIcAlvrjeB9vs7F6wTMsULCjBafIKTiCiN5NPLj0fZ0IaxZ3LCcNwDNI6NxRSCI5h30FYG8zD3HnPm0h1FVmeMjW_Oge_qU1b6kRT38UwoycKAcSLO4i","expirationTime":null,"keys":{"p256dh":"BGJZc90Pp2ufA3kOzYitKHrCZ0pID3tbh54VcIz9I2jasV9w-9dQtwJ1Lg8d96oQmTwY7JkwnTIV9ocOk9nmV6E","auth":"ACnN8VwAtSBEBlPUbrCDdA"}}	2020-04-10 15:34:16.452+00	2020-04-10 15:34:16.452+00	899e4a90-56c3-4878-ad45-4d2213abfca7
7e222694-2cfa-4eb8-b38f-a0e2194d119c	{"endpoint":"https://fcm.googleapis.com/fcm/send/cgRhSxUWT7A:APA91bHcQ4bcmcocu8tDlpdwTIcAlvrjeB9vs7F6wTMsULCjBafIKTiCiN5NPLj0fZ0IaxZ3LCcNwDNI6NxRSCI5h30FYG8zD3HnPm0h1FVmeMjW_Oge_qU1b6kRT38UwoycKAcSLO4i","expirationTime":null,"keys":{"p256dh":"BGJZc90Pp2ufA3kOzYitKHrCZ0pID3tbh54VcIz9I2jasV9w-9dQtwJ1Lg8d96oQmTwY7JkwnTIV9ocOk9nmV6E","auth":"ACnN8VwAtSBEBlPUbrCDdA"}}	2020-04-10 15:34:35.496+00	2020-04-10 15:34:35.496+00	899e4a90-56c3-4878-ad45-4d2213abfca7
220e3459-e8cf-45a8-b871-4162d7a1c8f5	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 16:17:06.958+00	2020-04-10 16:17:06.958+00	899e4a90-56c3-4878-ad45-4d2213abfca7
9689d167-2d80-4467-b203-66257e9bc79a	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:32:29.963+00	2020-04-10 18:32:29.963+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
4ce66abc-09f0-48ab-9271-7cda7e47ce4a	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:32:52.429+00	2020-04-10 18:32:52.429+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
4d69a22b-0389-40f0-a4ec-48d8fd89efb5	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:33:04.033+00	2020-04-10 18:33:04.033+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
73ad571d-ef0f-4dae-9c17-d81676ecba3a	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:33:17.935+00	2020-04-10 18:33:17.935+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
0dee4305-78fb-4976-bc7f-3260e8e084c1	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:33:34.673+00	2020-04-10 18:33:34.673+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
16033833-a021-4494-86f8-c1e56bf332d0	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:33:49.564+00	2020-04-10 18:33:49.564+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
cd462707-23f8-44ba-b197-ff07c1ffb63f	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:33:59.126+00	2020-04-10 18:33:59.126+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
f3de7f4d-7f77-48d4-a01b-ae1d8da30bf9	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:34:09.026+00	2020-04-10 18:34:09.026+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
2b08bcbe-f212-466e-bb54-8b57c4fd1f20	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:34:35.008+00	2020-04-10 18:34:35.008+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
2aeddb6c-3ece-4412-9f30-d2d2ba1b5774	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:34:45.143+00	2020-04-10 18:34:45.143+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
6fdffbe7-2e2a-4589-b14a-1ce6212eb603	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:35:12.743+00	2020-04-10 18:35:12.743+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
4d8bd06b-780d-4174-94f7-6cb65fccc0b7	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:35:27.556+00	2020-04-10 18:35:27.556+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
7650dc95-66ff-4291-b96e-2a46c88e8a57	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:35:41.043+00	2020-04-10 18:35:41.043+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
18f62146-0379-4d52-8b99-4884b2bbb598	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:36:05.172+00	2020-04-10 18:36:05.172+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
cfa64ede-58d4-4f15-8d7f-f55190f21c48	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:36:16.5+00	2020-04-10 18:36:16.5+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
f578d0ca-d378-4831-a78d-a511168bff19	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:36:43.971+00	2020-04-10 18:36:43.971+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
8becbe94-73cb-4176-832d-69888b086332	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:37:03.347+00	2020-04-10 18:37:03.347+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
db7b0985-6d83-42e4-94bc-bab1eb983387	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:37:16.852+00	2020-04-10 18:37:16.852+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
7bf4699a-48a7-409b-bdf2-5590973e9f94	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-10 18:37:35.182+00	2020-04-10 18:37:35.182+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
6d37f6b2-e8ef-45b5-ba1a-838f3986bba4	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-11 20:31:58.575+00	2020-04-11 20:31:58.575+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
b68ffa88-d52b-4282-9960-6d05fdeb27ef	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 10:46:04.907+00	2020-04-12 10:46:04.907+00	1b885225-2215-4098-9235-b01e6737b226
cfb3b2e4-c339-445b-9ca4-02ae439914de	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 10:46:14.326+00	2020-04-12 10:46:14.326+00	1b885225-2215-4098-9235-b01e6737b226
f282a36d-6782-4d3c-93d4-083463f48ac5	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 10:46:22.908+00	2020-04-12 10:46:22.908+00	1b885225-2215-4098-9235-b01e6737b226
be282ff8-a51e-498a-abf7-03b8f0368b9c	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 12:30:21.666+00	2020-04-12 12:30:21.666+00	1b885225-2215-4098-9235-b01e6737b226
18ddb28d-9997-4e38-8b24-4e0a93544325	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 12:30:32.089+00	2020-04-12 12:30:32.089+00	1b885225-2215-4098-9235-b01e6737b226
fd2df1f9-0bce-4fda-b1e9-2a8b4e38540d	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 12:30:44.515+00	2020-04-12 12:30:44.515+00	1b885225-2215-4098-9235-b01e6737b226
a2538723-df79-4d68-a39c-ddf3782f3a5c	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 12:34:42.162+00	2020-04-12 12:34:42.162+00	1b885225-2215-4098-9235-b01e6737b226
22c09ff9-d305-484e-8c3e-1b2a3f75c2b5	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 12:35:25.852+00	2020-04-12 12:35:25.852+00	1b885225-2215-4098-9235-b01e6737b226
b032b2e1-a3e0-43fd-937d-593334626fd0	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 12:35:42.777+00	2020-04-12 12:35:42.777+00	1b885225-2215-4098-9235-b01e6737b226
4befac2c-f28e-448f-b08b-7dc7a8bff07d	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 12:35:55.637+00	2020-04-12 12:35:55.637+00	1b885225-2215-4098-9235-b01e6737b226
b0ed18b2-a926-438b-872d-94ad879fcafc	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 13:05:23.045+00	2020-04-12 13:05:23.045+00	1b885225-2215-4098-9235-b01e6737b226
105812f1-8f8b-47f0-bc42-89d03fd9720d	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 13:05:29.813+00	2020-04-12 13:05:29.813+00	1b885225-2215-4098-9235-b01e6737b226
65e168e8-a5fb-446d-8517-980223dc6024	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 13:05:39.689+00	2020-04-12 13:05:39.689+00	1b885225-2215-4098-9235-b01e6737b226
7b991dd3-e87e-43b0-a921-f6f25c0e9ee3	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 13:05:49.308+00	2020-04-12 13:05:49.308+00	1b885225-2215-4098-9235-b01e6737b226
a7a9e89e-1b25-40a5-a536-d3a1fecfb67e	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-12 13:06:11.046+00	2020-04-12 13:06:11.046+00	1b885225-2215-4098-9235-b01e6737b226
08ea97ee-704c-4d02-982c-21d243c3f4ef	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:00:15.22+00	2020-04-13 11:00:15.22+00	1b885225-2215-4098-9235-b01e6737b226
d90c9802-da67-4c98-9349-f10e59c69d72	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:00:25.166+00	2020-04-13 11:00:25.166+00	1b885225-2215-4098-9235-b01e6737b226
6558c971-a92b-4866-9cec-2b9588809cdf	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:00:39.412+00	2020-04-13 11:00:39.412+00	1b885225-2215-4098-9235-b01e6737b226
c7bcc70e-6efc-4815-b171-c32b5abb5bd6	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:00:51.496+00	2020-04-13 11:00:51.496+00	1b885225-2215-4098-9235-b01e6737b226
72488af9-6bc4-4ccf-ac62-2a1d6db4b948	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:00:59.178+00	2020-04-13 11:00:59.178+00	1b885225-2215-4098-9235-b01e6737b226
02e05d86-5859-4d5a-9816-7d1c74aa497d	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:01:10.927+00	2020-04-13 11:01:10.927+00	1b885225-2215-4098-9235-b01e6737b226
83c79edb-fdb9-4da3-ba0a-125443474719	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:01:27.933+00	2020-04-13 11:01:27.933+00	1b885225-2215-4098-9235-b01e6737b226
86a96f98-9de7-4a54-afc8-cf20aea19f2a	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:01:38.231+00	2020-04-13 11:01:38.231+00	1b885225-2215-4098-9235-b01e6737b226
04a06952-20ac-47c0-989a-7aebb625691a	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:01:46.518+00	2020-04-13 11:01:46.518+00	1b885225-2215-4098-9235-b01e6737b226
9129fe96-a406-4a20-9481-7bea70899d33	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:01:59.706+00	2020-04-13 11:01:59.706+00	1b885225-2215-4098-9235-b01e6737b226
2481201f-e440-4841-a9b3-4ceae542575b	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:02:30.57+00	2020-04-13 11:02:30.57+00	1b885225-2215-4098-9235-b01e6737b226
7e6d6544-2c16-4d87-a532-2bfebf41724b	{"endpoint":"https://fcm.googleapis.com/fcm/send/eBakL26B_3U:APA91bFjtLkfd43gjzNHNn0-kcCSD3Vvkwoev6Isrsc4YGKzpCbRERrHVb-9mBRhIoAvoyC17g8DaTXltpvVcz8IfxhuVGkh1X8FPsX_H0wve_5Ycws2x73h6T2Y-FeL6_OnZNbITS5u","expirationTime":null,"keys":{"p256dh":"BNXtQlrBA0ofnKKAcana9FWQpqBWEF-lU8_3173sVbbTh00ID3PbzbznlTX7EnlM29BbXu1i-OP-hFRu100DTSY","auth":"oOJ4Jxo8j03-UzrnYqHVYg"}}	2020-04-13 11:02:44.071+00	2020-04-13 11:02:44.071+00	1b885225-2215-4098-9235-b01e6737b226
5d8b4381-2fab-4e3e-9a5b-219143b8d2d5	{"endpoint":"https://fcm.googleapis.com/fcm/send/eo8T80-sz24:APA91bHCH4cdS0SXXBVue4CRC1bks3wKvn-GbkW0xw6WZ0U8j5AD8bKiobuV9Llivak8BbnxKsNbKwKMEa1BVOHxpIw9xuHukRWgsnWzITTKIoyzNFQYWe3AO3U3NtSQhSSGX6Qn603I","expirationTime":null,"keys":{"p256dh":"BPHtEO5raH28vDMsZXtFdU2Zj6F2sdQaTcqAnSlQj5_Cn39kKdl52FQ2v6O1jOk4cEjS8FlSOU6I5SBb5v9dyr8","auth":"YONGSW_eBejyBWR9DCq3lQ"}}	2020-04-13 11:59:27.377+00	2020-04-13 11:59:27.377+00	fcf38be9-bcd3-4643-9352-43902831f654
32ab0267-50fa-42d8-8ae3-bfe580b42c5d	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-13 13:28:11.435+00	2020-04-13 13:28:11.435+00	be48312f-af3a-454e-afd3-f6894b305985
1dce59ee-97f5-4085-aeed-610ce0700321	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-13 13:29:03.39+00	2020-04-13 13:29:03.39+00	be48312f-af3a-454e-afd3-f6894b305985
35fed7c2-b5d6-49a6-aa68-81af39fe33e9	{"endpoint":"https://fcm.googleapis.com/fcm/send/cZ9JD2fbs-w:APA91bHLKYywUU--zxTI-GMtQh4y3AjKhzUsjns32EPSOuU1fw0XJQXpFUefVaTf65BHLG_OaGFGTuUpUMObRUnVQRjQEWkNITUM02RAw3mGP_uyebZKMfjb1OnUN7vxKP4euMaavgul","expirationTime":null,"keys":{"p256dh":"BDdUc9iovO7yJdcXF3Tq4FX-FUqfz8jRZcmmPNn79rlDvaXmmgrvI1qwrc-Es-OXliOFrZhP3DcYa0hoqy4kctk","auth":"lANWFYPLYmoNYm0uDhY07Q"}}	2020-04-13 13:44:24.037+00	2020-04-13 13:44:24.037+00	1b885225-2215-4098-9235-b01e6737b226
752ca7b7-51c7-474f-8312-cc92b70efb55	{"endpoint":"https://fcm.googleapis.com/fcm/send/cZ9JD2fbs-w:APA91bHLKYywUU--zxTI-GMtQh4y3AjKhzUsjns32EPSOuU1fw0XJQXpFUefVaTf65BHLG_OaGFGTuUpUMObRUnVQRjQEWkNITUM02RAw3mGP_uyebZKMfjb1OnUN7vxKP4euMaavgul","expirationTime":null,"keys":{"p256dh":"BDdUc9iovO7yJdcXF3Tq4FX-FUqfz8jRZcmmPNn79rlDvaXmmgrvI1qwrc-Es-OXliOFrZhP3DcYa0hoqy4kctk","auth":"lANWFYPLYmoNYm0uDhY07Q"}}	2020-04-13 13:44:45.765+00	2020-04-13 13:44:45.765+00	1b885225-2215-4098-9235-b01e6737b226
7741f460-e1a1-460f-a92f-57408e514f2b	{"endpoint":"https://fcm.googleapis.com/fcm/send/cZ9JD2fbs-w:APA91bHLKYywUU--zxTI-GMtQh4y3AjKhzUsjns32EPSOuU1fw0XJQXpFUefVaTf65BHLG_OaGFGTuUpUMObRUnVQRjQEWkNITUM02RAw3mGP_uyebZKMfjb1OnUN7vxKP4euMaavgul","expirationTime":null,"keys":{"p256dh":"BDdUc9iovO7yJdcXF3Tq4FX-FUqfz8jRZcmmPNn79rlDvaXmmgrvI1qwrc-Es-OXliOFrZhP3DcYa0hoqy4kctk","auth":"lANWFYPLYmoNYm0uDhY07Q"}}	2020-04-13 13:47:04.365+00	2020-04-13 13:47:04.365+00	1b885225-2215-4098-9235-b01e6737b226
a26ac400-a0a7-4eb3-bd76-539245c67b04	{"endpoint":"https://fcm.googleapis.com/fcm/send/cZ9JD2fbs-w:APA91bHLKYywUU--zxTI-GMtQh4y3AjKhzUsjns32EPSOuU1fw0XJQXpFUefVaTf65BHLG_OaGFGTuUpUMObRUnVQRjQEWkNITUM02RAw3mGP_uyebZKMfjb1OnUN7vxKP4euMaavgul","expirationTime":null,"keys":{"p256dh":"BDdUc9iovO7yJdcXF3Tq4FX-FUqfz8jRZcmmPNn79rlDvaXmmgrvI1qwrc-Es-OXliOFrZhP3DcYa0hoqy4kctk","auth":"lANWFYPLYmoNYm0uDhY07Q"}}	2020-04-13 13:52:06.009+00	2020-04-13 13:52:06.009+00	1b885225-2215-4098-9235-b01e6737b226
ad892f2e-7074-4902-b2e5-4c37a7794fe7	{"endpoint":"https://fcm.googleapis.com/fcm/send/cZ9JD2fbs-w:APA91bHLKYywUU--zxTI-GMtQh4y3AjKhzUsjns32EPSOuU1fw0XJQXpFUefVaTf65BHLG_OaGFGTuUpUMObRUnVQRjQEWkNITUM02RAw3mGP_uyebZKMfjb1OnUN7vxKP4euMaavgul","expirationTime":null,"keys":{"p256dh":"BDdUc9iovO7yJdcXF3Tq4FX-FUqfz8jRZcmmPNn79rlDvaXmmgrvI1qwrc-Es-OXliOFrZhP3DcYa0hoqy4kctk","auth":"lANWFYPLYmoNYm0uDhY07Q"}}	2020-04-13 13:53:43.858+00	2020-04-13 13:53:43.858+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
74267b05-36fc-4b9f-b5b4-4c88415e31bb	{"endpoint":"https://fcm.googleapis.com/fcm/send/cZ9JD2fbs-w:APA91bHLKYywUU--zxTI-GMtQh4y3AjKhzUsjns32EPSOuU1fw0XJQXpFUefVaTf65BHLG_OaGFGTuUpUMObRUnVQRjQEWkNITUM02RAw3mGP_uyebZKMfjb1OnUN7vxKP4euMaavgul","expirationTime":null,"keys":{"p256dh":"BDdUc9iovO7yJdcXF3Tq4FX-FUqfz8jRZcmmPNn79rlDvaXmmgrvI1qwrc-Es-OXliOFrZhP3DcYa0hoqy4kctk","auth":"lANWFYPLYmoNYm0uDhY07Q"}}	2020-04-13 14:45:36.111+00	2020-04-13 14:45:36.111+00	1b885225-2215-4098-9235-b01e6737b226
e34b2cbb-b3d7-4f0c-80a7-52f7344e125b	{"endpoint":"https://fcm.googleapis.com/fcm/send/cZ9JD2fbs-w:APA91bHLKYywUU--zxTI-GMtQh4y3AjKhzUsjns32EPSOuU1fw0XJQXpFUefVaTf65BHLG_OaGFGTuUpUMObRUnVQRjQEWkNITUM02RAw3mGP_uyebZKMfjb1OnUN7vxKP4euMaavgul","expirationTime":null,"keys":{"p256dh":"BDdUc9iovO7yJdcXF3Tq4FX-FUqfz8jRZcmmPNn79rlDvaXmmgrvI1qwrc-Es-OXliOFrZhP3DcYa0hoqy4kctk","auth":"lANWFYPLYmoNYm0uDhY07Q"}}	2020-04-13 14:46:15.218+00	2020-04-13 14:46:15.218+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
159881bf-04a1-461b-899f-9f313e61983d	"eFVJ17bpq6Q:APA91bE-V8NcfErWxwHH5exOgFf4woUYX9YI2l8mGEiHsZ4-C-ZI-GO16qGU0zzct_-o2S-YEWl-hNG1VCtXENxWigJtZv5q1pfZ0w77o2EKpncQhILt6geVQgTzCN6q5riOhtGbH14Y"	2020-04-13 20:12:21.415+00	2020-04-13 20:12:21.415+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
0faf7be2-9a17-48c9-865d-cf980301e1aa	"eFVJ17bpq6Q:APA91bE-V8NcfErWxwHH5exOgFf4woUYX9YI2l8mGEiHsZ4-C-ZI-GO16qGU0zzct_-o2S-YEWl-hNG1VCtXENxWigJtZv5q1pfZ0w77o2EKpncQhILt6geVQgTzCN6q5riOhtGbH14Y"	2020-04-13 20:12:21.47+00	2020-04-13 20:12:21.47+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
da7a568b-4e3f-4c08-af9b-4465a082de06	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:57:00.428+00	2020-04-14 12:57:00.428+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
ca9e7bd8-a5c8-4ed9-b0eb-cf6e89bdaeb2	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:57:12.258+00	2020-04-14 12:57:12.258+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
811e749b-a43e-4e91-ac72-dbccdb9f7f7c	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:57:27.162+00	2020-04-14 12:57:27.162+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
1f0cbce4-4d0b-4744-b133-9f3712fd4a51	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:57:38.825+00	2020-04-14 12:57:38.825+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
f5666c2d-09c9-43b2-9f7b-1f4c5a0746be	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:57:54.275+00	2020-04-14 12:57:54.275+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
bc8feba3-fe1b-4bd9-8930-153e773c20ad	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:58:04.043+00	2020-04-14 12:58:04.043+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
8f155a16-eab8-46b2-a993-95eda2861c2b	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:58:18.643+00	2020-04-14 12:58:18.643+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
07b86736-c889-4680-aef8-f05be1d8f1ae	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:58:31.732+00	2020-04-14 12:58:31.732+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
c9d164aa-83e5-4180-8b87-cdaee8f40155	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:58:45.568+00	2020-04-14 12:58:45.568+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
d3823dde-9926-4150-9b4e-1df812fa7fa7	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 12:58:57.333+00	2020-04-14 12:58:57.333+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
7c4d4cf0-eb96-479d-89c7-3b684ba85ce6	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 13:03:31.557+00	2020-04-14 13:03:31.557+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
17aa1e2c-a9e5-4075-99d5-6eba4f026e04	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 13:03:50.384+00	2020-04-14 13:03:50.384+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
d33e2c4b-aa5a-47a5-b0be-bd2570c3016a	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 13:04:27.411+00	2020-04-14 13:04:27.411+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
46d4a2f5-e818-4a8d-a6a3-edd4b0c76040	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 13:04:38.449+00	2020-04-14 13:04:38.449+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
ae7c031e-ba37-4e00-9762-419c3e3341cb	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 13:04:49.876+00	2020-04-14 13:04:49.876+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
fdbf4357-bb2d-45e9-b5d6-36111a013234	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 13:05:20.587+00	2020-04-14 13:05:20.587+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
8142e368-d437-47cf-b733-f79c3f47740c	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 16:05:41.486+00	2020-04-14 16:05:41.486+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
be069989-a5ff-43cf-a6db-8bbf59a6fcc5	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 16:05:55.115+00	2020-04-14 16:05:55.115+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
618e34ef-4d87-4e2e-b367-6e73407295d9	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 16:06:23.159+00	2020-04-14 16:06:23.159+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
76063350-269b-4e79-92d3-569edfd7da04	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 16:06:51.677+00	2020-04-14 16:06:51.677+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
5ec659f6-594f-4c38-89d7-6937782a8928	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 16:07:31.053+00	2020-04-14 16:07:31.053+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
59af64f8-43dc-45e2-b74a-31540b89a2f8	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 16:07:46.875+00	2020-04-14 16:07:46.875+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
729e81b6-2e99-4a0a-adc4-c0b1ab83ef71	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 20:45:48.933+00	2020-04-14 20:45:48.933+00	23cd23b0-612f-4d1b-8306-d2cfd6b6dfeb
56836b12-6af8-4993-85c0-0244a3406df2	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 20:45:57.876+00	2020-04-14 20:45:57.876+00	23cd23b0-612f-4d1b-8306-d2cfd6b6dfeb
a30433f1-b90c-4dfa-8d25-26e80d885850	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-14 20:47:45.09+00	2020-04-14 20:47:45.09+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
9b4bd24e-3ff3-4ed8-b7b7-d917b7dda794	{"endpoint":"https://fcm.googleapis.com/fcm/send/e3CuZ-AGJr0:APA91bGce77NK6QP0Gwj81lJ7MBNkB30ZWEp5ed8hN3CcoQAP4KfxvX9x9I592_KfUofIL2w8UaiKGuer7HJJ2mExRSjqceHlm63_K8_MsMU54INmIgto4E8xUTBBKmsD7gYvPB7WvT1","expirationTime":null,"keys":{"p256dh":"BNpcvojGYtUaoC1EzRE4JtctKxHSMKwUjca9qO_f-uT-dixRTcmwEpnRCnLE4CnJSdIdr4tZUoYQd5RZwCrRFeU","auth":"ObSLo3Qf30c_Jq0t0J6Asw"}}	2020-04-15 15:51:58.292+00	2020-04-15 15:51:58.292+00	abe27836-ff9d-4408-a65f-3023f936bfb8
be8c5759-3cba-483e-8f29-40f17a1a94da	{"endpoint":"https://fcm.googleapis.com/fcm/send/e3CuZ-AGJr0:APA91bGce77NK6QP0Gwj81lJ7MBNkB30ZWEp5ed8hN3CcoQAP4KfxvX9x9I592_KfUofIL2w8UaiKGuer7HJJ2mExRSjqceHlm63_K8_MsMU54INmIgto4E8xUTBBKmsD7gYvPB7WvT1","expirationTime":null,"keys":{"p256dh":"BNpcvojGYtUaoC1EzRE4JtctKxHSMKwUjca9qO_f-uT-dixRTcmwEpnRCnLE4CnJSdIdr4tZUoYQd5RZwCrRFeU","auth":"ObSLo3Qf30c_Jq0t0J6Asw"}}	2020-04-15 15:52:29.405+00	2020-04-15 15:52:29.405+00	abe27836-ff9d-4408-a65f-3023f936bfb8
b79ba003-c2c3-422b-9f06-c907a587691f	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-16 14:42:21.463+00	2020-04-16 14:42:21.463+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
591ce56f-35ab-471d-a384-3350e7b784d3	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-16 14:42:57.089+00	2020-04-16 14:42:57.089+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
b6bfe27b-c320-4563-af8e-776c54e77cc8	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-16 14:49:45.45+00	2020-04-16 14:49:45.45+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
fc48b055-c35a-427a-aa72-bedd893ac374	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-16 14:56:47.93+00	2020-04-16 14:56:47.93+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
1af728d6-9e33-44ee-ad96-e583ed03388b	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-17 14:24:15.662+00	2020-04-17 14:24:15.662+00	abe27836-ff9d-4408-a65f-3023f936bfb8
977a383d-9bd3-474f-b090-d3c6fd399ad7	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-17 14:24:35.754+00	2020-04-17 14:24:35.754+00	abe27836-ff9d-4408-a65f-3023f936bfb8
a7211e65-e9e4-415f-9068-eefee883679e	{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABei3l_ee-qYyVlVbCg-YQzFWmQptHm25oHYSizaiIIlllTvVdF-U4QEVFLwjz8Jbe8ITijKgOPFi26DA8SxrRlt1CF50hKSfTzbT9fOhR9jmtdSM0FwDq57F-oQOLat8jg4w_GE80lrLlu_iWxCHj844s-Ia5x3tmv3o25uZzRIivz2-g","keys":{"auth":"1fqH8WGEMUW8tAvR7eVHQg","p256dh":"BPgig9jb251R6zQzRqvzsmOCvDyzkNdgHpGHXDU1V285H-fLLCayqTCsc9x-EfvvOXx1Dh2wOTCM8vHuFH89GSE"}}	2020-04-17 20:52:14.468+00	2020-04-17 20:52:14.468+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
\.


--
-- Data for Name: drivers; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY drivers ("driverID", "driverName", "driverImage", "driverVideo", "seqNo", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: invites; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY invites ("invID", "mobileNumber", email, status, code, "createdAt", "updatedAt", "rID", "uID") FROM stdin;
500c196a-da2f-4ad4-a174-b76e4320d58a	\N	greg@directconnectlogistix.com	invited	60541	2020-03-16 14:36:34.23+00	2020-03-16 14:36:34.23+00	dcce0cb2-628c-4549-a71f-9e801f002492	\N
f1893de2-8f49-4bf3-941b-6092bcc15dee	\N	sun	invited	69234	2020-03-23 20:07:22.317+00	2020-03-23 20:07:22.317+00	bb233817-fd9c-4ccd-9103-479302c2f1d7	\N
ee4dc889-08a6-4ada-9301-29ff5f38441d	\N	sundaresh.ramanathan@kinneygroup.com	invited	68806	2020-03-23 20:07:59.488+00	2020-03-23 20:07:59.488+00	e61e62b8-4433-4f40-83fd-06afdac00777	\N
49414802-c0e2-4046-bb1d-07dc2e065101	\N	bharatbonde1@gmail.com	invited	43994	2020-03-24 05:50:28.783+00	2020-03-24 05:50:28.783+00	17f26546-df4f-46e2-807e-e91ead33872c	1b885225-2215-4098-9235-b01e6737b226
036556c5-d566-46fe-b827-f1e2f3017a1b	\N	tyler@directconnectlogistix.com	invited	70850	2020-03-30 16:01:45.698+00	2020-03-30 16:01:45.698+00	0c0e005c-658b-4686-8131-54fb63c2d883	\N
4e80b6e0-b1e1-4a76-b765-d934a3b68d82	\N	kevin.hudson@rcre.com	invited	58141	2020-04-03 19:15:11.712+00	2020-04-03 19:15:11.712+00	eafdc07b-580c-43b5-80df-979ea2ac2dc8	\N
3b2497e8-3ea2-49e3-bd17-993476a4cfe3	\N	tyler@directconnectlogistix.com	invited	65330	2020-04-03 21:00:11.044+00	2020-04-03 21:00:11.044+00	b8a8a638-90bc-40b3-9289-5e7ae357f5ca	\N
c9ffa3cf-ac40-4767-89c0-ec64c29f919e	\N	kevin.hudson@rcre.com	invited	46368	2020-04-06 13:57:00.328+00	2020-04-06 13:57:00.328+00	fce53a2d-3f2b-4529-baab-c3a1a80cda48	abe27836-ff9d-4408-a65f-3023f936bfb8
e1bef880-e7eb-444b-ba0e-0f0902cd62f0	\N	tyler@directconnectlogistix.com	invited	35309	2020-04-06 14:33:10.839+00	2020-04-06 14:33:10.839+00	0615c54f-8210-4598-858a-ad113a33b33c	f810e2d7-bfee-43d2-8750-e392eb4cb007
f7ed1683-0bbe-4569-bd33-2679133920ef	\N	fgfg	invited	24340	2020-04-11 05:31:10.405+00	2020-04-11 05:31:10.405+00	c8f55b38-397c-4510-9b89-6f1d397681cb	1b885225-2215-4098-9235-b01e6737b226
5f2c1638-7379-4418-85d6-a31144052686	\N	acmeraj@catipuilt.ai	invited	85712	2020-04-07 19:50:00.386+00	2020-04-07 19:50:00.386+00	7e96087d-1a5e-4512-a6a5-f5b63e272d79	3a64764d-07b0-4b9a-9e2f-267a946e6cea
c1db4bbf-4066-4176-98e2-d856db00f39b	\N	ebourget@halfserious.com	invited	35475	2020-04-09 17:43:48.061+00	2020-04-09 17:43:48.061+00	be7671a3-f706-4b4c-947c-2f02aaaf7be8	\N
3426b525-e056-40cf-bea4-a0e5c87a1e6c	\N	osofs@superrito.com	invited	10093	2020-04-11 05:25:36.113+00	2020-04-11 05:25:36.113+00	be2727b8-1725-4350-ace5-d3de9d887c43	1b885225-2215-4098-9235-b01e6737b226
53ce8cf6-970a-4de4-874b-a9d6e9e20f46	\N	bharatbonde1@gmail.com	invited	37499	2020-04-11 05:33:54.947+00	2020-04-11 05:33:54.947+00	c8f55b38-397c-4510-9b89-6f1d397681cb	1b885225-2215-4098-9235-b01e6737b226
6501f69f-acc0-43dd-af93-14892990cfee	\N	bharatbonde1@gmail.com	invited	59308	2020-04-11 05:35:00.06+00	2020-04-11 05:35:00.06+00	c8f55b38-397c-4510-9b89-6f1d397681cb	1b885225-2215-4098-9235-b01e6737b226
8ebd6a5e-bf2c-41e0-9fab-d05621d23275	\N	fdgdf	invited	25084	2020-04-11 05:40:05.758+00	2020-04-11 05:40:05.758+00	a42c344c-8e98-42f1-89b8-721fac7587f0	1b885225-2215-4098-9235-b01e6737b226
f9b495ff-83f3-4c7f-9ecb-c759bbb1d1b0	\N	fdgdfg	invited	61458	2020-04-11 05:41:34.959+00	2020-04-11 05:41:34.959+00	a42c344c-8e98-42f1-89b8-721fac7587f0	1b885225-2215-4098-9235-b01e6737b226
4e30ff7d-e1dc-4927-8373-f52f13752a4e	\N	dgdg	invited	66681	2020-04-11 05:45:35.58+00	2020-04-11 05:45:35.58+00	97dd2c13-72a3-4537-8ba6-83cb00779d28	1b885225-2215-4098-9235-b01e6737b226
eda1e2c6-b42a-4839-b4a5-ada74777fccd	\N	dfgdf	invited	37223	2020-04-11 05:54:41.911+00	2020-04-11 05:54:41.911+00	a42c344c-8e98-42f1-89b8-721fac7587f0	1b885225-2215-4098-9235-b01e6737b226
ea403257-adf8-41f7-9194-74be6cde96dc	\N	fdg	invited	44019	2020-04-11 05:55:56.901+00	2020-04-11 05:55:56.901+00	be2727b8-1725-4350-ace5-d3de9d887c43	1b885225-2215-4098-9235-b01e6737b226
5e0bb772-99db-4b7c-bac4-31297b1e774c	\N	bharatbonde1@gmail.com	invited	93071	2020-04-11 05:59:53.848+00	2020-04-11 05:59:53.848+00	be2727b8-1725-4350-ace5-d3de9d887c43	1b885225-2215-4098-9235-b01e6737b226
5544fbbc-f7f1-4172-b65f-08caacfcd4c2	\N	bharatb@niidtech.com	invited	42564	2020-04-11 06:00:59.432+00	2020-04-11 06:00:59.432+00	a42c344c-8e98-42f1-89b8-721fac7587f0	1b885225-2215-4098-9235-b01e6737b226
b74dfd73-dc93-4762-9618-bded58bfe183	\N	vijay.c@akoninfotech.com	invited	34523	2020-04-11 06:10:13.932+00	2020-04-11 06:10:13.932+00	a42c344c-8e98-42f1-89b8-721fac7587f0	1b885225-2215-4098-9235-b01e6737b226
ba815b1d-2620-46d2-b551-c0bda53f4ffe	\N	dgdgtest19@niidtech.com	invited	73296	2020-04-11 06:16:53.557+00	2020-04-11 06:16:53.557+00	c8f55b38-397c-4510-9b89-6f1d397681cb	1b885225-2215-4098-9235-b01e6737b226
e3a1f830-77b9-4819-88f3-939085c30198	\N	test19@niidtech.com	invited	52100	2020-04-11 06:17:53.682+00	2020-04-11 06:17:53.682+00	a42c344c-8e98-42f1-89b8-721fac7587f0	1b885225-2215-4098-9235-b01e6737b226
6db18e89-266b-4292-bdb5-3f551a70b0eb	\N	dfdf	invited	69910	2020-04-13 09:36:19.75+00	2020-04-13 09:36:19.75+00	46c04f41-c6be-4533-b79a-fe587fdbaf43	30a9c98c-ad5e-4f95-9f54-39512aebf323
54742d9a-6d95-415c-83df-0051d875de7d	\N	dfdfd	invited	87748	2020-04-13 10:05:30.95+00	2020-04-13 10:05:30.95+00	5676e1ed-bcf5-4680-932c-3fe703c32837	30a9c98c-ad5e-4f95-9f54-39512aebf323
419b5487-e728-4da2-81de-4e933ed3a422	\N	test20@niidtech.com	invited	22567	2020-04-13 10:12:09.492+00	2020-04-13 10:12:09.492+00	b9dba0a5-cc92-4027-98f4-199b7fc46232	30a9c98c-ad5e-4f95-9f54-39512aebf323
3887f043-9123-4331-a2ff-a22c0ee5f673	\N	ragdgdfdf@superrito.com	invited	21921	2020-04-13 10:17:32.343+00	2020-04-13 10:17:32.343+00	17f26546-df4f-46e2-807e-e91ead33872c	1b885225-2215-4098-9235-b01e6737b226
9227e97a-839d-4a12-b777-d2a2f2ebc6f4	\N	George@thetrailyouth.com	invited	21004	2020-04-13 18:40:17.89+00	2020-04-13 18:40:17.89+00	a63d44bd-54a0-4a02-bc0e-1ffb7279db37	2f76261a-73b3-4423-bd2d-7831ad42df3d
\.


--
-- Data for Name: kpi; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY kpi ("kpiID", qty, "achieveQty", unit, objective, "dependFlag", "charpStatus", "dueData", "createdAt", "updatedAt", "driverID", "uID") FROM stdin;
\.


--
-- Data for Name: kpilog; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY kpilog ("kpilogID", qty, comments, "charpStatus", "createdAt", "updatedAt", "kpiID", "uID") FROM stdin;
\.


--
-- Data for Name: leval; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY leval ("levalID", "levalName", "levalNo", "createdAt", "updatedAt") FROM stdin;
d2b11d3f-9d35-43cf-b232-84315c7109b5	L1	1	2019-09-24 05:13:50.215+00	2019-09-24 05:13:50.215+00
d2b11d3f-9d35-43cf-b232-84315c7109b9	L2	2	2019-09-24 05:13:50.215+00	2019-09-24 05:13:50.215+00
d2b11d3f-9d35-43cf-b232-84315c7109jj	L3	3	2019-09-24 05:13:50.215+00	2019-09-24 05:13:50.215+00
d2b11d3f-9d35-43cf-b232-84315c7109jh	L4	4	2019-09-24 05:13:50.215+00	2019-09-24 05:13:50.215+00
d2b11d3f-9d35-43cf-b232-84315c7109rh	L5	5	2019-09-24 05:13:50.215+00	2019-09-24 05:13:50.215+00
\.


--
-- Data for Name: milestones; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY milestones ("mileID", qty, "achieveText", type, "dueDate", "dependFlag", "superReferUserID", "charpStatus", "charpCount", "createdAt", "updatedAt", "kpiID", "uID", "mileReferID") FROM stdin;
5f2ae423-acb9-4fe5-bb54-f18dd1477261	\N	$75,000 Dec. 31, 2020	\N	2020-12-30	f	899e4a90-56c3-4878-ad45-4d2213abfca7	A	0	2020-04-10 15:29:16.479+00	2020-04-10 15:49:02.97+00	\N	899e4a90-56c3-4878-ad45-4d2213abfca7	\N
aa2f8728-66fd-4f75-9f02-7228561c9069	\N	10,000 LP's 2x/week by 12/31/20	\N	2020-06-29	f	899e4a90-56c3-4878-ad45-4d2213abfca7	A	0	2020-04-10 15:30:04.015+00	2020-04-10 15:48:57.086+00	\N	899e4a90-56c3-4878-ad45-4d2213abfca7	\N
d8f4be5f-d0fa-4009-a0e6-b5acc8071652	\N	Advertise on Facebook in April 2020	\N	2020-04-24	f	b6410c77-6c5b-4546-90e0-f8f0567c9d53	C	0	2020-03-30 18:02:03.538+00	2020-03-30 18:02:33.123+00	\N	b6410c77-6c5b-4546-90e0-f8f0567c9d53	\N
404beb19-9e9c-4a9d-8797-10a200283221	\N	25 paid attendees in online course	\N	2020-09-29	f	899e4a90-56c3-4878-ad45-4d2213abfca7	A	0	2020-04-10 15:34:35.461+00	2020-04-10 15:49:00.182+00	\N	899e4a90-56c3-4878-ad45-4d2213abfca7	\N
729d7cca-c0e5-478b-ba87-006ab3a9cecd	\N	Coaching 2 leadership teams	\N	2020-09-29	f	899e4a90-56c3-4878-ad45-4d2213abfca7	A	0	2020-04-10 15:34:00.16+00	2020-04-10 15:48:53.032+00	\N	899e4a90-56c3-4878-ad45-4d2213abfca7	\N
50ce9323-49d6-4eec-b324-1ddd58840b0d	\N	Coaching 4 leadership teams	\N	2020-12-30	f	899e4a90-56c3-4878-ad45-4d2213abfca7	A	0	2020-04-10 15:34:16.443+00	2020-04-10 15:49:06.162+00	\N	899e4a90-56c3-4878-ad45-4d2213abfca7	\N
779a4414-f63d-4449-ad64-cecccbcd0011	\N	get gym membership	\N	2021-12-30	f	\N	C	0	2020-04-14 20:45:57.814+00	2020-04-14 20:46:20.096+00	\N	23cd23b0-612f-4d1b-8306-d2cfd6b6dfeb	\N
f4c64152-4d67-4c95-a275-5269ca080e1d	\N	Introduce new product line	\N	2022-03-30	f	\N	C	0	2020-04-14 20:45:48.943+00	2020-04-14 20:46:45.909+00	\N	23cd23b0-612f-4d1b-8306-d2cfd6b6dfeb	\N
a52fec3b-b877-4ca3-9547-703f3ef4250f	\N	Host first one by Q4 2020	\N	2020-12-30	f	899e4a90-56c3-4878-ad45-4d2213abfca7	A	0	2020-04-10 15:28:15.519+00	2020-04-10 15:49:04.593+00	\N	899e4a90-56c3-4878-ad45-4d2213abfca7	\N
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY notification ("notifyID", "isRead", "dueDate", "createdAt", "updatedAt", "uID", "mileID") FROM stdin;
a674b45e-5728-4a0f-be69-44045ac19d65	f	2020-04-24	2020-04-21 11:12:50.542+00	2020-04-21 11:12:50.542+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53	d8f4be5f-d0fa-4009-a0e6-b5acc8071652
\.


--
-- Data for Name: onboardingstatus; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY onboardingstatus ("onboardingStatusID", "isActive", "createdAt", "updatedAt", "pagecontentID", "uID") FROM stdin;
\.


--
-- Data for Name: option; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY option ("optionID", option, "correctAns", "createdAt", "updatedAt", "queID") FROM stdin;
a3edf8f0-a1b1-42fb-b14e-bf3cc60568f7	dgdg	f	2019-09-26 09:46:54.101+00	2019-09-26 09:46:54.101+00	\N
2a544970-22c0-4e37-b42e-1785a46a52b8	fdgfdg	f	2019-09-26 09:46:54.101+00	2019-09-26 09:46:54.101+00	\N
94c527ab-9728-4ab9-9a85-5f22a9f4704a	sdf	f	2019-09-26 09:28:26.453+00	2019-09-26 09:28:26.453+00	\N
50557870-53f0-42ff-9910-dce98398e290	sdfdsf	f	2019-09-26 09:28:26.453+00	2019-09-26 09:28:26.453+00	\N
a477c2d9-697c-4c0b-8e42-9bb7e63881c0	dsfdsf	f	2019-09-26 09:28:26.453+00	2019-09-26 09:28:26.453+00	\N
a914217a-5f73-4fa8-a5bc-adadd2b4f2e2	dsfsdf	f	2019-09-26 09:28:26.453+00	2019-09-26 09:28:26.453+00	\N
039d3ef5-cebb-494f-a1d9-34e642741a78	44	f	2019-09-26 10:01:32.26+00	2019-09-26 10:01:32.26+00	\N
5536e467-f5d5-4186-8791-e08f1a9f66dc	fgfg	f	2019-09-26 10:01:32.26+00	2019-09-26 10:01:32.26+00	\N
8c080525-6650-45d4-bce4-698977153517	fgfg	f	2019-09-26 10:01:32.26+00	2019-09-26 10:01:32.26+00	\N
dd92eedf-cb8f-4203-90ff-aeb151dd9056	fgfg	f	2019-09-26 10:01:32.26+00	2019-09-26 10:01:32.26+00	\N
1c6e61ce-72bc-41ee-8a28-ba648ea5ae16	fgg	f	2019-09-26 10:12:51.493+00	2019-09-26 10:12:51.493+00	\N
8c67524c-0224-4286-a854-5139f2f53d81	dfgg	f	2019-09-26 10:12:51.493+00	2019-09-26 10:12:51.493+00	\N
17513e72-3129-425f-9ec2-789c96d1b8a0	dfgdfg	f	2019-09-26 10:12:51.493+00	2019-09-26 10:12:51.493+00	\N
53f7c77e-2dc6-48a8-be1f-e6caeef3b7bd	dfgdg	f	2019-09-26 10:12:51.493+00	2019-09-26 10:12:51.493+00	\N
70dcee1d-ca2a-40d8-98c7-8be6bf073d4e	fgg	f	2019-09-26 10:05:44.377+00	2019-09-26 10:05:44.377+00	\N
5f9914f9-e192-4ea0-b9d7-1abd2ecef1b9	fdgfd	f	2019-09-26 10:05:44.377+00	2019-09-26 10:05:44.377+00	\N
4b342456-d1e3-45e4-aaae-fab3c69e17c8	fdgf	f	2019-09-26 10:05:44.377+00	2019-09-26 10:05:44.377+00	\N
ea4aa0e5-a238-489c-b32f-bca8c2892953	dfgf	f	2019-09-26 10:05:44.377+00	2019-09-26 10:05:44.377+00	\N
1757a27e-e5b0-4983-85e2-9e453aed7c92	dfgfdg	f	2019-09-26 11:39:34.585+00	2019-09-26 11:39:34.585+00	\N
45a39b2a-36f1-43d7-abf7-7751e6077750	dfgdfg	f	2019-09-26 11:39:34.585+00	2019-09-26 11:39:34.585+00	\N
8ab8bd61-b0cd-405a-a179-927b5aeb9175	10 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
bd3c118c-8a2f-4296-bb22-b00f9a53d66c	15 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
571b4294-5990-4a52-ae55-0ed1a1e8ffd9	20 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
f2e367a9-4d91-4c74-9dcd-7c7e630fc520	50 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
c754c8ff-3958-45b2-8b6b-9013ed69f190	10 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
b4e55025-6496-4bd4-8881-c0989afe90a6	CEO	f	2019-10-01 06:29:03.282+00	2019-10-01 06:29:03.282+00	\N
df03db3f-9ade-493d-8c22-b1109c1930f6	President	f	2019-10-01 06:29:03.282+00	2019-10-01 06:29:03.282+00	\N
724f6e40-3b5f-40ce-895f-a46cdb78bd4e	VP	f	2019-10-01 06:29:03.282+00	2019-10-01 06:29:03.282+00	\N
d56d7a44-abcd-4271-9e44-b65f81742731	No title, I've plan to sell my company	f	2019-10-01 06:29:03.282+00	2019-10-01 06:29:03.282+00	\N
c07b62ff-a5b9-4841-ab3e-061210fbe0c7	<$1,000,000	f	2019-10-01 14:12:09.398+00	2019-10-01 14:12:09.398+00	\N
516206b8-67af-4c41-8248-e862e17f294e	$1 MM - $10 MM	f	2019-10-01 14:12:09.398+00	2019-10-01 14:12:09.398+00	\N
3763d199-836d-4fd7-8b30-fe03cb7dfd0b	$10 MM - $50 MM	f	2019-10-01 14:12:09.398+00	2019-10-01 14:12:09.398+00	\N
9f61a8cc-a4ec-4c70-ac4b-d120a9b6a5af	$50 MM - $100 MM	f	2019-10-01 14:12:09.398+00	2019-10-01 14:12:09.398+00	\N
e5d4ba8c-f407-4238-baed-ae360cdb952c	$100 MM - $200 MM	f	2019-10-01 14:12:09.398+00	2019-10-01 14:12:09.398+00	\N
9ada8c93-55c1-4ab4-9a56-b52a195a45f8	$200MM - $500 MM	f	2019-10-01 14:12:09.398+00	2019-10-01 14:12:09.398+00	\N
f64ad73d-1d23-462f-ade1-6a73ea35f2df	>$500 MM	f	2019-10-01 14:12:09.398+00	2019-10-01 14:12:09.398+00	\N
aa2c9634-e751-476b-85ad-0ab0f6ebaded	20 %	f	2019-09-27 10:06:22.239+00	2019-09-27 10:06:22.239+00	\N
dae37f9a-8034-4a0f-9e24-909af2d69a44	30%	f	2019-09-27 10:06:22.239+00	2019-09-27 10:06:22.239+00	\N
21123a44-dc52-49ff-b1ec-41e4381fdd20	70%	f	2019-09-27 10:06:22.239+00	2019-09-27 10:06:22.239+00	\N
09698e1a-3057-48fb-a39e-7a85a35160ff	80 to 100 %	f	2019-09-27 10:06:22.239+00	2019-09-27 10:06:22.239+00	\N
74b2096f-4590-409c-a226-b7a2aff7c823	Dysfunctional	f	2019-10-01 06:41:27.854+00	2019-10-01 06:41:27.854+00	\N
14086f0b-5132-4702-a447-696a79823269	barely functional	f	2019-10-01 06:41:27.854+00	2019-10-01 06:41:27.854+00	\N
811352e8-9aab-4e38-8f5c-1bcaac42564b	functional	f	2019-10-01 06:41:27.854+00	2019-10-01 06:41:27.854+00	\N
26ce353f-2604-4caf-b1e2-5b823f19a50c	well oiled machine	f	2019-10-01 06:41:27.854+00	2019-10-01 06:41:27.854+00	\N
9e3f5a13-6511-4245-84d3-167df2c1eb38	they're so good they don't really need me	f	2019-10-01 06:41:27.854+00	2019-10-01 06:41:27.854+00	\N
219642fe-8f73-4b67-ae05-abe70741f7f0	2	f	2019-09-26 11:43:06.825+00	2019-09-26 11:43:06.825+00	\N
ccc172ec-a98c-40a6-9e67-661bf01a0495	4	f	2019-09-26 11:43:06.825+00	2019-09-26 11:43:06.825+00	\N
575b4632-a764-4810-b2e3-1e04cc52dbc1	8	f	2019-09-26 11:43:06.825+00	2019-09-26 11:43:06.825+00	\N
2ffca052-2cbd-49eb-b858-78f5988d27ac	15	f	2019-09-26 11:43:06.825+00	2019-09-26 11:43:06.825+00	\N
bb270add-a289-4c14-84f6-9551a4830f56	15 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
793e2d71-efed-4ae3-9815-e6c118d68260	20 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
4b2e0131-05ad-486b-ac91-eece042885b5	50 M	f	2019-09-27 10:04:34.12+00	2019-09-27 10:04:34.12+00	\N
f6851970-00fa-4bd5-8dc8-491e78825f9a	EBITDA	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
79a36890-c0c3-4b3f-9472-0f414e0799dd	Product Discounting	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
8d06dd03-0556-46ed-9a56-7485a854edcb	Collections	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
70358e69-0654-4c03-bec0-e5279bb22c38	Product returns	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
a08f5047-9810-488b-a3ab-e3a0399f3d43	Months of operating capital	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
ec3d10f2-39d9-4be9-92f7-bd9da97ffb96	Product gross margins	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
37f2860d-260e-48a3-9e8b-9859af457f68	Customer account reviews	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
3d81b63d-1bc0-492a-9662-2d1004f780d0	Other	f	2019-10-02 06:23:14.339+00	2019-10-02 06:23:14.339+00	\N
a851d182-296e-4273-a1ac-6520d19dc6be	EBITDA	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
eea68b53-04fa-46bc-8be7-33dd0e2d32c3	Product Discounting	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
4a8dc6ad-0ea9-41d5-8690-2f357dcd6ef4	Collections	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
9faef07d-c158-49ac-918e-b298b325cef6	Product returns	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
58306c07-781c-4e27-91f1-4a6a1395a1c1	Months of operating capital	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
f29e199e-2a8b-40fd-b104-d9b2aee6b26e	Product gross margins	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
89e793db-bc9b-473b-8ce2-e3cd9965024d	Customer account reviews	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
01c325b9-96a7-4db4-b816-c49501c71503	Other	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
cff5d0c6-39ee-4f1c-8bd4-b6646d464dfe	EBITDA	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
213d4582-a8b9-4f2e-b771-bfc72282d448	Product Discounting	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
29609e26-bed4-49b8-8cfc-62e350508b35	Collections	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
d625aee9-92f3-41df-9584-1a5262d4a754	Product returns	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
01eab05b-40f5-4575-affd-286bc16fd77d	Months of operating capital	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
edf615d2-2a21-45f8-8865-b877ad0e0c99	Product gross margins	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
0821987d-65cf-463d-b76e-04ad9ec2533b	Customer account reviews	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
acbef617-8ee3-4fd0-b9da-1ca509ab7173	Other	f	2019-10-02 06:23:22.407+00	2019-10-02 06:23:22.407+00	\N
60cd638b-2f1a-4137-941d-ad8cbd33019f	Skills development of your team?	f	2019-10-02 05:41:22.884+00	2019-10-02 05:41:22.884+00	\N
32f95e59-75a6-4f8f-be0c-be1c1d89c219	Alignment	f	2019-10-02 05:41:22.884+00	2019-10-02 05:41:22.884+00	\N
81b31542-2c78-48dc-82dc-94204ad8bcb7	Attitude	f	2019-10-02 05:41:22.884+00	2019-10-02 05:41:22.884+00	\N
ad84ae91-2627-4dae-ae0a-d691ff244cd0	Changing some members of the team	f	2019-10-02 05:41:22.884+00	2019-10-02 05:41:22.884+00	\N
5bbfbfb1-61ba-4233-941a-ce08c054de5f	Skills development of your team?	f	2019-10-02 05:39:14.796+00	2019-10-02 05:39:14.796+00	\N
9615fabb-d695-4115-a921-e1e9e10381dc	Alignment	f	2019-10-02 05:39:14.796+00	2019-10-02 05:39:14.796+00	\N
45e5653d-99ec-446b-84bd-585ce840d79c	Attitude	f	2019-10-02 05:39:14.796+00	2019-10-02 05:39:14.796+00	\N
5f21068d-4942-4f65-a43e-43c295ceceda	Changing some members of the team	f	2019-10-02 05:39:14.796+00	2019-10-02 05:39:14.796+00	\N
55bf7a66-939d-4ee6-8360-b73af65424a9	Accountability	f	2019-10-02 05:39:14.796+00	2019-10-02 05:39:14.796+00	\N
9b99704f-19f0-42b3-8d50-d06084e0591c	Other	f	2019-10-02 05:39:14.796+00	2019-10-02 05:39:14.796+00	\N
1a9e9d90-c0ec-468f-a589-76f95d1fd011	If other, then text field	f	2019-10-02 05:39:14.796+00	2019-10-02 05:39:14.796+00	\N
d34fd1f3-8243-4262-8412-7ca8f6538e48	Accountability	f	2019-10-02 05:41:22.884+00	2019-10-02 05:41:22.884+00	\N
40d05cb9-998b-4b99-920b-dc4ca8f6f125	Other	f	2019-10-02 05:41:22.884+00	2019-10-02 05:41:22.884+00	\N
33a8649c-5a32-46a2-9998-965fd6a9a7c6	This year's sales goal (NOTE: Have this defaulted to being selected)	f	2019-10-02 06:32:34.312+00	2019-10-02 06:32:34.312+00	\N
09b70887-941c-49b1-9653-0fcbfaaef85a	Year / Year growth rates	f	2019-10-02 06:32:34.312+00	2019-10-02 06:32:34.312+00	\N
cc19838a-9805-4bd7-bc9a-1583af649a49	Team alignment	f	2019-10-02 06:32:34.312+00	2019-10-02 06:32:34.312+00	\N
7ca1ab67-7072-4a3c-93eb-23b8e955833c	Sales enablement technologies	f	2019-10-02 06:32:34.312+00	2019-10-02 06:32:34.312+00	\N
0612c710-de85-4359-97e4-08498e65d897	Employee Communication	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
31d030c9-d993-4083-a5a6-bbfd0a5752de	Employee Egagement	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
beef80bd-0d5f-43c6-b33a-17ff94230b38	Retention Rates	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
19e1eab2-7e90-4a61-84ab-294ec7ae9ddf	Upward mobility	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
91d373c3-1a27-4fee-908e-85f09299e01e	Team building	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
65861a49-b4a3-4f15-bc45-b924df380a8b	Time with family	f	2019-10-01 14:58:15.653+00	2019-10-07 21:50:52.788+00	\N
1655ee95-df46-4d41-8900-d3d27b3c318e	Reading	f	2019-10-01 14:58:15.653+00	2019-10-07 21:50:52.788+00	\N
f8cd95ce-d419-4b73-8215-3a6472efffeb	Other	f	2019-10-01 14:58:15.653+00	2019-10-07 21:50:52.789+00	\N
74123319-08c2-450d-9976-1fb32874c48d	Weight loss	f	2019-10-01 14:58:15.653+00	2019-10-07 21:50:52.789+00	\N
2e6bbcb1-9ae8-4f13-acc7-f3fe95953c86	Reduction in work time	f	2019-10-01 14:58:15.653+00	2019-10-07 21:50:52.79+00	\N
eb99baf6-3889-4813-9de8-d475317e697a	Vacation 	f	2019-10-01 14:58:15.653+00	2019-10-07 21:50:52.79+00	\N
3e4ddef4-320e-43f1-8808-3c614590af34	Exercise	f	2019-10-01 14:58:15.653+00	2019-10-07 21:50:52.791+00	\N
3f9fb81d-f543-4ce0-9f4a-aa698b08d461	Reducing the number of poor performers	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
8ed91f42-6473-4292-86de-a761f6d15dba	Make sure all employees know how they are compensated	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
26efe8e3-0a0d-4cfc-99ba-5848389f9d2d	Other	f	2019-10-02 05:50:16.001+00	2019-10-02 05:50:16.001+00	\N
3e3817b8-f4ec-4b34-bd96-9d802769e131	Adding more channels to our sales strategy	f	2019-10-02 06:32:34.312+00	2019-10-02 06:32:34.312+00	\N
41c2fbda-ac59-4e82-914a-9aafca8d252c	Reducing the number of channels we sell through	f	2019-10-02 06:32:34.312+00	2019-10-02 06:32:34.312+00	\N
55d2f5bd-f8af-4ff4-b58f-7e54586b0dc0	Other	f	2019-10-02 06:32:34.312+00	2019-10-02 06:32:34.312+00	\N
1668023c-b2ef-40f1-9d5f-9e183a58a2f1	Customer churn	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
cf3ee701-7684-4530-8bf0-1f9a0204df37	Increase referrals	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
ef82fe4c-1a48-47cf-9a91-38e8000be19b	Increase recurring revenue	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
432ba92c-7f93-48db-8411-6b26eeb11b09	Price adjustments	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
b52f397a-1ac0-45fe-a0a8-e0811656715b	Increasing cross-sell opportunities	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
ba5e5357-d6bf-4eb7-9db8-8ff2a5a82b03	Measuring customer satisfaction	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
38f51510-d0b5-4745-bb81-8003436c209a	Meeting with customers	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
18f99550-cd9a-4c24-bad9-de3ec2d7dec0	Other	f	2019-10-02 06:03:24.24+00	2019-10-02 06:03:24.24+00	\N
5e4519f8-a1da-4ee5-a84b-1eb76bedc252	Debt to Cash Ratio	f	2019-10-02 06:13:58.691+00	2019-10-02 06:13:58.691+00	\N
80bf09c2-951e-48fb-b529-65e2b8bf744a	Interest Rates	f	2019-10-02 06:13:58.691+00	2019-10-02 06:13:58.691+00	\N
0a96a62c-731f-49d8-872e-870505682bac	Return on Equity	f	2019-10-02 06:13:58.691+00	2019-10-02 06:13:58.691+00	\N
7b7f7e6c-eac1-4b6f-bda1-323d586f3e8d	Cashflow	f	2019-10-02 06:13:58.691+00	2019-10-02 06:13:58.691+00	\N
9282daa3-53c1-4f9a-95d5-434d4a08ee5c	Regular communication with financial partners	f	2019-10-02 06:13:58.691+00	2019-10-02 06:13:58.691+00	\N
dfc496bb-0fbf-4ae4-953f-dfe1e648d873	Debt reduction	f	2019-10-02 06:13:58.691+00	2019-10-02 06:13:58.691+00	\N
562b4baf-bd43-404b-87fc-13b2fdfad676	other	f	2019-10-02 06:13:58.691+00	2019-10-02 06:13:58.691+00	\N
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY organization ("orgID", "orgName", address, city, "logoUrl", "secretCode", email, "startDate", "endDate", "isActive", "createdAt", "updatedAt") FROM stdin;
3bcf5c31-5fb1-4b19-8369-88249ccd0376	Peter Fuller Personal	\N	\N	\N	\N	pfuller1@mac.com	2019-11-15	2032-11-12	t	2019-11-15 21:57:32.44+00	2019-11-15 21:57:32.44+00
dd2416b2-6aa0-4380-94f7-0d923c14f911	redhat	\N	\N	\N	\N	redhat@armyspy.com	2019-12-03	2019-11-29	t	2019-11-29 12:05:07.595+00	2019-11-29 12:05:07.595+00
0e2e7cc4-95c0-4a8d-9613-5724820c695a	SNJ Enterprise	\N	\N	\N	\N	rohanrane69@gmail.com	2019-12-06	2019-12-06	t	2019-12-06 05:15:07.597+00	2019-12-06 05:15:07.597+00
bfcbba2d-de04-4830-bdcd-47be6dafeff0	infosys	\N	\N	\N	\N	infosys@armyspy.com	2019-12-06	2019-12-06	t	2019-12-06 06:41:41.284+00	2019-12-06 06:41:41.284+00
0a151ad5-9e51-4c0e-992f-08d81a795a0a	Akon2018	\N	\N	\N	\N	sana@armyspy.com	2019-11-06	2019-11-30	t	2019-11-06 11:45:30.485+00	2019-12-06 10:30:19.518+00
8c17aa4d-4953-4584-9958-c6e12723a91f	tcs	\N	\N	\N	\N	tcs@armyspy.com	2019-12-09	2019-12-31	t	2019-12-09 07:22:39.408+00	2019-12-09 07:24:02.766+00
e6d24ad4-45b2-4e55-872b-48e596604217	Jennifer Harvey and Company	\N	\N	\N	\N	jharvey@equian.com	2019-12-13	2024-01-10	t	2019-12-13 21:18:07.699+00	2019-12-13 21:18:07.699+00
460c81f4-690e-4ef0-8c38-2fb496f2a4f1	86 Executive Club	\N	\N	\N	\N	86executiveclub@catipult.ai	2019-12-31	2020-01-31	t	2019-12-31 16:52:05.485+00	2019-12-31 16:52:05.485+00
d7292edf-b928-497a-a732-e7b6a437a116	sanas	\N	\N	\N	\N	sana.s@akoninfotech.com	2020-01-01	2020-01-03	t	2020-01-01 08:34:45.529+00	2020-01-01 08:35:38.3+00
67d2179d-8bae-481a-b9b3-02c2aba735a1	sanas	\N	\N	\N	\N	sanas@armyspy.com	2020-01-01	2020-01-05	t	2020-01-01 08:41:42.716+00	2020-01-01 08:41:42.716+00
3650e8ef-3725-42a6-8bbb-e0b9eb893d6d	shama fire	\N	\N	\N	\N	bharat2020@superrito.com	2020-01-15	2020-01-30	t	2020-01-07 13:12:48.55+00	2020-01-07 13:12:48.55+00
fefa5f82-85e7-4bfe-a88d-e62ab63ec093	8/6 Executive Club	\N	\N	\N	\N	jam@livefused.com	2019-12-31	2020-01-31	t	2019-12-31 16:12:02.364+00	2020-01-08 21:50:34.082+00
2cae037a-e70a-417a-858e-35b2737de4d9	CATIPULT232	Koregaon Park,Pune	Pune	\N	jsfsfhsjfjks	peter@livefused.com	2019-10-12	2021-01-07	t	2019-09-24 05:12:02.09+00	2019-12-06 10:36:33.9+00
fea4adf9-8e98-4c9e-92fd-1a48657a4939	sansay	\N	\N	\N	\N	sansay@armyspy.com	2020-01-21	2020-01-22	t	2020-01-21 06:46:12.914+00	2020-01-21 06:46:12.914+00
36d01dc5-887a-4438-83de-22953e0c57f0	The Trail Youth Coffee Home	\N	\N	\N	\N	kristen@thetrailyouth.com	2020-02-04	2025-02-05	t	2020-02-04 18:13:26.516+00	2020-02-04 18:13:26.516+00
c9e71910-a86a-4cf4-9828-38394b5e3105	test	\N	\N	\N	\N	sana@classesmail.com	2020-02-05	2020-02-29	t	2020-02-05 12:23:08.739+00	2020-02-05 12:23:08.739+00
8150ee17-c556-4c83-9978-564a61f5e3eb	Laura Kopetsky Trucking	\N	\N	\N	\N	amie@laurakopetsky.com	2020-02-10	2021-02-03	t	2020-02-10 19:43:40.709+00	2020-02-10 19:43:40.709+00
094ada57-aaff-48a0-ae28-d79f9898cb66	Catipult, Inc.	\N	\N	\N	\N	peter@catipult.ai	2020-02-19	2037-02-20	t	2020-02-19 18:12:39.296+00	2020-02-19 18:12:39.296+00
f900b638-3982-4135-9743-5b75bf87e4fd	Express Pro Staffing	\N	\N	\N	\N	shannon.wenninger@expresspros.com	2020-02-26	2028-02-14	t	2020-02-26 19:22:30.729+00	2020-02-26 19:22:30.729+00
beed950e-e786-4b6c-b697-4c538d01e3cb	Rogo	\N	\N	\N	\N	troy@rogo.com	2020-02-27	2023-02-10	t	2020-02-27 18:18:13.353+00	2020-02-27 18:18:13.353+00
94e99724-e67c-49d7-b626-aa7a25cadb3f	JarredBunch	\N	\N	\N	\N	sjarred@jarredbunch.com	2020-03-06	2023-06-13	t	2020-03-06 13:53:09.753+00	2020-03-06 13:53:09.753+00
b87b7c48-0203-414f-bf97-dc261b2f12c4	Christy Ventures	\N	\N	\N	\N	dc@approvedonline.com	2020-03-06	2023-05-05	t	2020-03-06 13:54:37.341+00	2020-03-06 13:54:37.341+00
692624a0-9c32-454b-923f-2c95a86473f4	SinglePoint	\N	\N	\N	\N	trent.dougherty@singlepointhcm.com	2020-03-06	2023-05-07	t	2020-03-06 13:56:02.949+00	2020-03-06 13:56:02.949+00
9d183314-41e9-4354-953f-80b15fb45021	Thieneman Construction	\N	\N	\N	\N	ken.thieneman@thienemanconstruction.com	2020-03-06	2023-05-07	t	2020-03-06 13:58:13.249+00	2020-03-06 13:58:13.249+00
c0165031-18eb-469f-bc72-d038427fcc97	NIID TEST CATIPULT	\N	\N	\N	\N	rohanr@niidtech.com	2020-03-12	2021-03-11	t	2020-03-12 13:36:38.073+00	2020-03-12 13:36:38.073+00
07987f10-eb93-4bff-a78d-a20d734cba89	Kinney Group Engineering	\N	\N	\N	\N	sr@sundareshr.com	2020-03-23	2029-03-12	t	2020-03-23 20:17:10.831+00	2020-03-23 20:17:10.831+00
5838acbe-14e5-4cb2-89a1-a58eebec723b	ShipSights	\N	\N	\N	\N	chase@shipsights.com	2020-03-24	2033-04-15	t	2020-03-24 18:46:49.675+00	2020-03-24 18:46:49.675+00
56f0c396-78e1-4e97-8999-16a4adf57256	Langham Logistics	\N	\N	\N	\N	cathylangham@elangham.com	2020-03-31	2025-04-04	t	2020-03-31 20:35:56.832+00	2020-03-31 20:35:56.832+00
78732a87-303f-4b58-ae79-114978d4a872	Natural Success Institute	\N	\N	\N	\N	susan@naturalsuccessinstitute.com	2020-04-02	2025-04-04	t	2020-04-02 20:05:46.108+00	2020-04-02 20:05:46.108+00
38fd946f-3f48-47d7-abe4-6c79d2890672	DCL	\N	\N	\N	\N	tyler@directconnectlogistix.com	2020-04-03	2025-04-04	t	2020-04-03 21:00:11.002+00	2020-04-03 21:00:11.002+00
97d9d640-88f2-4cd0-a523-810d390e11db	Direct Connect 	\N	\N	\N	\N	tylerjkeller@yahoo.com	2020-04-03	2025-04-04	t	2020-04-03 21:02:10.8+00	2020-04-03 21:02:10.8+00
f220eb5e-9275-442d-8d8e-084c114ed277	test	\N	\N	\N	\N	ragdg@superrito.com	2020-04-08	2020-04-29	t	2020-04-06 05:10:59.036+00	2020-04-06 05:10:59.036+00
c8f55fab-026c-49ff-9082-be8b9b0ba839	RCRE	\N	\N	\N	\N	sam.smith@rcre.com	2020-04-06	2021-04-05	t	2020-04-06 12:54:14.949+00	2020-04-06 12:54:14.949+00
6499b1b3-46f1-490f-9530-7ed128753ef8	Rectify Solar	\N	\N	\N	\N	pteague@rectifysolar.com	2020-04-07	2025-04-08	t	2020-04-07 13:03:07.514+00	2020-04-07 13:03:07.514+00
74a52879-bb1b-401a-9562-527fa1e08569	Acme Awning Company Complete	\N	\N	\N	\N	acmekaren@catipult.ai	2020-04-07	2029-04-08	t	2020-04-07 19:43:41.068+00	2020-04-07 19:43:41.068+00
8f604868-3bf7-4f34-a135-60aaf8fc35ce	Corvigo Empty	\N	\N	\N	\N	corvigocarla@catipult.ai	2020-04-07	2033-04-06	t	2020-04-07 19:44:31.478+00	2020-04-07 19:44:31.478+00
d4ccbc4d-b78d-4b69-a289-0829ed40530d	Half Serious	\N	\N	\N	\N	ebourget@halfserious.com	2020-04-09	2023-04-14	t	2020-04-09 17:43:48.008+00	2020-04-09 17:43:48.008+00
\.


--
-- Data for Name: pagecontent; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY pagecontent ("pagecontentID", "pageName", content, "videoUrl", routers, "nextRoute", "nextPage", "pageInfo", "isActive", "createdAt", "updatedAt", "driverID") FROM stdin;
\.


--
-- Data for Name: quarterkpiassign; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY quarterkpiassign ("qkaID", "targetAchieve", status, "createdAt", "updatedAt", "qsID", "mileID", "uID") FROM stdin;
6cdfbbc7-f4a8-4456-b5bc-3f8a4e3db5d9	\N	f	2020-04-10 15:30:33.891+00	2020-04-10 15:30:33.891+00	0c269420-7615-4e76-a87e-b2a750589774	aa2f8728-66fd-4f75-9f02-7228561c9069	899e4a90-56c3-4878-ad45-4d2213abfca7
3b5627cd-fe3b-48e7-926b-7cb764c2d38e	\N	f	2020-04-10 15:30:41.925+00	2020-04-10 15:30:41.925+00	0c269420-7615-4e76-a87e-b2a750589774	a52fec3b-b877-4ca3-9547-703f3ef4250f	899e4a90-56c3-4878-ad45-4d2213abfca7
2841cb14-bf13-4de4-9282-a23397c02319	\N	f	2020-04-10 15:30:47.372+00	2020-04-10 15:30:47.372+00	0c269420-7615-4e76-a87e-b2a750589774	5f2ae423-acb9-4fe5-bb54-f18dd1477261	899e4a90-56c3-4878-ad45-4d2213abfca7
9f27c30a-55ee-4baf-b5e1-ad308d5d68f3	\N	f	2020-04-10 15:34:48.071+00	2020-04-10 15:34:48.071+00	0c269420-7615-4e76-a87e-b2a750589774	a52fec3b-b877-4ca3-9547-703f3ef4250f	899e4a90-56c3-4878-ad45-4d2213abfca7
259974df-06e2-4a9d-b482-aa7ab6205d1e	\N	f	2020-04-10 15:35:04.966+00	2020-04-10 15:35:04.966+00	c5edd4c3-9722-4c33-9e99-7daf0598ff37	729d7cca-c0e5-478b-ba87-006ab3a9cecd	899e4a90-56c3-4878-ad45-4d2213abfca7
65e9982e-a15f-4fd6-8a62-316f554b1893	\N	f	2020-04-10 15:35:11.524+00	2020-04-10 15:35:11.524+00	43ce2426-d4b8-428d-bb0b-81ece7f700a0	404beb19-9e9c-4a9d-8797-10a200283221	899e4a90-56c3-4878-ad45-4d2213abfca7
cfa4370f-26f6-4157-ba6e-776ce79fd82b	\N	f	2020-04-10 15:35:16.108+00	2020-04-10 15:35:16.108+00	c5edd4c3-9722-4c33-9e99-7daf0598ff37	404beb19-9e9c-4a9d-8797-10a200283221	899e4a90-56c3-4878-ad45-4d2213abfca7
528a2e37-eb53-4017-9df1-6cf6996b8515	\N	f	2020-04-10 15:35:20.95+00	2020-04-10 15:35:20.95+00	0c269420-7615-4e76-a87e-b2a750589774	aa2f8728-66fd-4f75-9f02-7228561c9069	899e4a90-56c3-4878-ad45-4d2213abfca7
3bd163ed-102e-4366-984a-227f6ddebc01	\N	f	2020-04-10 15:35:27.861+00	2020-04-10 15:35:27.861+00	0c269420-7615-4e76-a87e-b2a750589774	50ce9323-49d6-4eec-b324-1ddd58840b0d	899e4a90-56c3-4878-ad45-4d2213abfca7
fb795a0a-5b69-4c05-8a87-7588730f10f4	\N	f	2020-04-10 15:35:33.218+00	2020-04-10 15:35:33.218+00	0c269420-7615-4e76-a87e-b2a750589774	5f2ae423-acb9-4fe5-bb54-f18dd1477261	899e4a90-56c3-4878-ad45-4d2213abfca7
28d4dc02-7300-489e-93d6-5809c471ad82	\N	f	2020-04-10 15:37:14.215+00	2020-04-10 15:37:14.215+00	0c269420-7615-4e76-a87e-b2a750589774	a52fec3b-b877-4ca3-9547-703f3ef4250f	899e4a90-56c3-4878-ad45-4d2213abfca7
7551669d-0ba2-44e4-a433-6bf78559155c	\N	f	2020-04-10 15:37:22.811+00	2020-04-10 15:37:22.811+00	c5edd4c3-9722-4c33-9e99-7daf0598ff37	729d7cca-c0e5-478b-ba87-006ab3a9cecd	899e4a90-56c3-4878-ad45-4d2213abfca7
3834b73f-6126-4f45-9953-992bb47f25d2	\N	f	2020-04-10 15:37:35.211+00	2020-04-10 15:37:35.211+00	7e9845e6-3ac2-4f0e-8ac0-b73a7588da10	5f2ae423-acb9-4fe5-bb54-f18dd1477261	899e4a90-56c3-4878-ad45-4d2213abfca7
e61b3580-210e-47e1-b258-ed8cd53c5859	\N	f	2020-04-10 15:37:39.359+00	2020-04-10 15:37:39.359+00	7e9845e6-3ac2-4f0e-8ac0-b73a7588da10	5f2ae423-acb9-4fe5-bb54-f18dd1477261	899e4a90-56c3-4878-ad45-4d2213abfca7
e89ad618-2cb1-437c-92ad-0e8decad921c	\N	f	2020-04-10 15:37:41.306+00	2020-04-10 15:37:41.306+00	0c269420-7615-4e76-a87e-b2a750589774	5f2ae423-acb9-4fe5-bb54-f18dd1477261	899e4a90-56c3-4878-ad45-4d2213abfca7
4ae036cb-ad7d-43ec-a032-c86b59dfc546	\N	f	2020-04-10 15:37:46.59+00	2020-04-10 15:37:46.59+00	0c269420-7615-4e76-a87e-b2a750589774	50ce9323-49d6-4eec-b324-1ddd58840b0d	899e4a90-56c3-4878-ad45-4d2213abfca7
4a9431ca-2cbd-4d9e-9339-bc4177bd48ec	\N	f	2020-04-10 15:37:51.305+00	2020-04-10 15:37:51.305+00	c5edd4c3-9722-4c33-9e99-7daf0598ff37	404beb19-9e9c-4a9d-8797-10a200283221	899e4a90-56c3-4878-ad45-4d2213abfca7
b2f7a919-f4ca-4840-bc5e-5c75bee736cb	\N	f	2020-04-10 15:37:57.592+00	2020-04-10 15:37:57.592+00	e58fa596-e1a9-46e1-b4a8-34b12750bc5c	aa2f8728-66fd-4f75-9f02-7228561c9069	899e4a90-56c3-4878-ad45-4d2213abfca7
eb8d4648-ede1-4012-839d-30a6dd8bdaf7	\N	f	2020-03-30 18:02:11.471+00	2020-03-30 18:02:11.471+00	e745b7d2-d3a8-42ba-824d-a104d7337425	d8f4be5f-d0fa-4009-a0e6-b5acc8071652	b6410c77-6c5b-4546-90e0-f8f0567c9d53
\.


--
-- Data for Name: quartersplit; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY quartersplit ("qsID", type, "startDate", "endDate", "createdAt", "updatedAt", "uID") FROM stdin;
211be182-26fe-4112-bc3c-d7f19b729072	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
012479a2-89d9-4f9e-a964-3a1d61fa8d0f	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
22654eb0-37a6-4d06-8f9b-ebef23afbd4b	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
162e092c-ec95-4688-ae31-a03b062046c4	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
bc0c0f0e-467c-4a5c-a60a-bff8b08d978c	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
f8ca321a-081f-47be-bddc-3c50cac42666	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
0507c38a-c9fc-4f6c-b070-33ee78b9a3db	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
e0b4469d-0bd9-477b-9bb3-3c3172e5b970	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
4348085d-6bb3-4920-9e2b-4185ce3851a8	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
278bb03b-5366-460d-815d-30a09fe0bced	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
aa0281f6-522f-4474-8f28-4152aed4d600	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
ca3165eb-962b-4591-9c2b-90f32d6354b2	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-23 20:28:52.245+00	2020-03-23 20:28:52.245+00	4294bbd3-a527-4814-a584-1711ca75cc1b
fa0b66b3-ac6a-434b-be87-59cd24198eb6	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
e9eb60ae-1b91-4f68-a2c2-5fdf8fcb663f	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
453b2838-975f-426d-b6b0-d6f48c722186	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
081dca08-19d3-46b4-86c2-6cbb64f5df82	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
b0cadfdd-fc64-4556-a815-09ed3c9e0c18	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
acc3b85e-a765-460f-aaae-56baf0042065	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
d7b17858-8f74-4b42-a250-d96f28dbf421	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
c1ebcf34-8627-4fe3-b78b-d069f021e35c	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
a9630f14-c70f-459f-abac-a69b99ae4308	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
c01545cd-fd5b-4215-b5ea-73dfc32fc4a4	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
75e2a47d-e2ac-4d41-a406-3fc267079c1e	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
f9392208-0fde-43d0-9791-a8827a27541f	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-01-20 19:18:09.96+00	2020-01-20 19:18:09.96+00	\N
847ed61a-209c-4bae-b716-7acfee61240a	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
af0e2096-088f-41c0-b6f4-e8aa3e2c1f15	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
c6477ddc-10fa-4588-964d-077e88fdde1e	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
a7f176e5-2107-4c8f-8d2c-4a6a32e8de67	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
cf08da33-8efa-4f61-b062-07984a4e727c	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
38f104fa-585a-45c7-bd14-8f26c644c95b	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
43910f56-996c-46b0-a41b-cfa881338238	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
50f635d8-4e53-4f4d-86f0-06a77ad3de0d	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
22921fe9-19c6-4faf-b514-da946ee02b9a	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
4f01287d-235b-4ae4-85af-2f415790cd30	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
e9b0b518-354a-4905-bdee-414fe7846e9a	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
18923875-ae7d-4754-93d2-3b01b71eb5d7	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-01-14 20:59:43.101+00	2020-01-14 20:59:43.101+00	\N
0ecc8c35-987c-4ddd-9e59-22cc8910a7d5	quarter1	2019-12-31 18:30:00+00	2020-03-30 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
3a3422eb-6ffb-4245-ac12-ff272e37e32c	quarter2	2020-03-31 18:30:00+00	2020-06-29 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
541d2df4-0866-4e6e-a9d2-311f9dc0ba06	quarter3	2020-06-30 18:30:00+00	2020-09-29 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
71bbdcca-a03b-4721-bd5e-45a0f0a55a1a	quarter4	2020-09-30 18:30:00+00	2020-12-30 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
a2bcc3f0-6c9c-4813-8e77-1ef751df4672	quarter5	2020-12-31 18:30:00+00	2021-03-30 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
b1177da3-9571-46f8-b3c6-caff3d9c9167	quarter6	2021-03-31 18:30:00+00	2021-06-29 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
515a1e94-09b8-4527-b586-c8270c177b48	quarter7	2021-06-30 18:30:00+00	2021-09-29 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
6b7ff019-b706-4571-bbf1-0dee50dd8845	quarter8	2021-09-30 18:30:00+00	2021-12-30 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
f8b1d38a-1c18-4fb8-8644-221e6b5ee25e	quarter9	2021-12-31 18:30:00+00	2022-03-30 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
24b49240-d1f1-4b47-91e1-7aca1ffe38a4	quarter10	2022-03-31 18:30:00+00	2022-06-29 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
95334c1f-3502-4fda-bfdd-dcf2671ffff4	quarter11	2022-06-30 18:30:00+00	2022-09-29 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
8f8ec17f-47d5-43b6-bd90-61971b480a28	quarter12	2022-09-30 18:30:00+00	2022-12-30 18:30:00+00	2020-02-05 06:28:09.339+00	2020-02-05 06:28:09.339+00	ebf8b5ed-1518-41ef-9863-cbb0492cbd90
ae410bf7-d3d6-4e53-b5a3-86885f83940a	quarter1	2019-12-31 18:30:00+00	2020-03-30 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
30f7dabe-365e-49d9-801a-f76d75d5628b	quarter2	2020-03-31 18:30:00+00	2020-06-29 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
cf09ddec-c3da-463f-98bc-fac06565ceb1	quarter3	2020-06-30 18:30:00+00	2020-09-29 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
9a3adda2-eb95-440a-9ddb-11bce0487059	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
fe863bea-af2a-42da-9f76-10e6f900efd5	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
d59f53e3-b55a-4dcb-a062-446d02fa0134	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
856f6500-f1d6-451f-9091-b1b8008c0778	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
e6549779-9b83-4bf3-978d-55aae43d169a	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
6b36b7d0-a3c2-42b6-81a7-65e8ae0f1831	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
8a8e1faa-17f1-47d4-b614-636e455cc293	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
aa6da449-3b6a-4484-87c9-0b371b49f666	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
547ce7f3-f5e0-46df-918f-2264ca835b93	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
33ca7dde-b33b-4d00-b313-97e8d1e2b20a	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
7490a6bf-34a8-4328-8e48-08939ee11e89	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
11161784-fabf-4a09-ada5-c49e231067df	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
278629bf-b6b1-425a-8377-a1338716a702	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
d21d7f86-4365-488e-8850-a95c20b1ef5b	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
7ff112c8-4d67-4a07-a7b6-ccad333a9163	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-02-06 06:34:50.436+00	2020-02-06 06:34:50.436+00	efe64586-eda8-4ee7-8acb-c181ec48f526
d42ffcac-8432-4e2c-a4c7-ac3979dc7c88	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
42c396e6-63cf-4795-b08c-6b5234fd0e72	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
293e3ebf-5222-4c56-bdff-6f4107d3ce98	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
1a9ef5f7-440d-451d-9346-89ba61ef44af	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
d57d7bdc-4762-4531-8611-8c17f87f4f27	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
ebe35fb6-074a-4369-8333-d03440cdd0ba	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
6f2eb279-8b76-483d-9f89-5e4485ac7e3e	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
cd41b99a-4272-4400-b94d-cda6856485ea	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
3e19061b-4700-4134-aba9-1f8683c0eb6c	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
ea10cda1-2f63-4ab1-ae7a-762132ae5002	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
78e71c5a-7f2e-4f71-b9b6-64e0d43d1123	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
4ae9ecb7-942e-45c2-9af7-79ce2b5b43bd	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-02-04 18:54:30.03+00	2020-02-04 18:54:30.03+00	2f76261a-73b3-4423-bd2d-7831ad42df3d
2c65ac26-ed06-47cd-899a-bbdd616f2e24	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
8647a754-b71e-48a0-ab80-12f08910c812	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
d3bfb11c-27c3-40b6-a29b-2f43ba7eb4db	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
145dd6ec-0a2d-4e4c-b182-27e8a80d47e8	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
d7fc33e0-8e66-4b0d-b565-95f4c5c60f8c	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
4317e877-ee23-4114-b9f8-763422a3d0e7	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
3ef104e1-33cb-4620-8207-c664fe955268	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
06efda62-1ef4-4293-b152-c5a7e8df69de	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
c76a7562-30c5-41a5-bed9-8caa942c5949	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
b3eaba23-3ac7-42ea-b7aa-25fb5bc9bff6	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
b96a083a-46f2-4728-839c-cde0548529af	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
819a7b9d-7ec5-41ad-9c47-49ac27cafe32	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
08b566f2-0aa2-4527-9644-ec19e2183609	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
ba3d07bd-34b5-4f8e-8115-94767da34548	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
28a90f4b-712f-456d-9fdf-a8884a06b086	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
341c821f-7b50-499f-8a8e-63a7dd63657e	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
bda9ef18-be01-4b15-a4af-2115e2ba8b9d	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
3b716eca-4228-4bb0-be91-e4d2e07eca37	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
4ac1820e-49bb-4ebb-941a-bab0a55121b8	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
40fe741f-7cf2-4d5e-b3c9-1f08669f6614	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
1f55e44a-2b43-4421-8c02-90591ea867ec	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
5cf5c806-361b-465d-a8f8-165cdf20b732	quarter4	2020-09-30 18:30:00+00	2020-12-30 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
13a168f4-90db-4ea9-a6aa-e1b6173638e7	quarter5	2020-12-31 18:30:00+00	2021-03-30 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
c85a4e7f-6752-4761-9fe5-40da00c3c642	quarter6	2021-03-31 18:30:00+00	2021-06-29 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
e0f69f45-49ae-4af4-948a-faebe9fa5ae6	quarter7	2021-06-30 18:30:00+00	2021-09-29 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
dcdc4445-f456-411d-b420-39d44ac25d35	quarter8	2021-09-30 18:30:00+00	2021-12-30 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
72944597-4a35-4b76-8918-f9361ea6caac	quarter9	2021-12-31 18:30:00+00	2022-03-30 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
d3ce6e6c-52e1-4bc8-abf2-c7a18abe1871	quarter10	2022-03-31 18:30:00+00	2022-06-29 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
ef100708-f957-4662-8ea8-ce9d4198e68d	quarter11	2022-06-30 18:30:00+00	2022-09-29 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
4df2313d-06a0-46c5-bd46-060ba2880d60	quarter12	2022-09-30 18:30:00+00	2022-12-30 18:30:00+00	2020-03-11 10:12:57.626+00	2020-03-11 10:12:57.626+00	90014cc3-c92c-4255-bb94-83ac9c01fd90
eeb39d08-c811-4eed-9875-b4f176d7ed10	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
f8680120-78b7-4e98-8be2-6a9d05d975f8	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
6bbce4e2-dafe-4c83-950f-f1cb993ff806	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
86396fcd-4fe4-42d8-a8a4-cde553a92123	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
3835c43e-00ff-4353-b5c3-8e8084d3fc79	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
5fd7b1c3-596e-4395-a090-a4876fa72a61	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
b79b29a4-6239-480a-9604-2f0ee4a6159e	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
60699f9b-66d2-4ba0-9c48-c180d522043b	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
74864f40-c335-4a52-a7a3-3904f25a3946	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
fc80893f-48ba-451d-a6a4-a04689968248	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
4dc141a8-2fe3-48a1-8f5f-8f18cc4f14d3	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
efbf089c-c79b-4983-9df1-70db18d0def6	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
357a4c81-cc13-4c98-8c83-eb7ce76da538	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
d408d1a7-1669-406a-a672-b5cf8a3a2e70	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
5239aa76-1cde-4c48-bea9-39711ec23be1	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
d5ce1f36-1d39-4781-986a-ad089807fcd8	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
bbbbb6a1-950a-4362-b205-08cbe6bc8dca	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-01-08 16:31:27.151+00	2020-01-08 16:31:27.151+00	98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6
168a44cc-1a60-45e0-9601-3734e8206b57	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
6c8d8a3f-8b1f-42d3-94b6-99b60516d1a7	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
1930c402-4486-4f47-a10f-aa55f1da143a	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
c887dbc3-f8d9-417f-aaaf-b525c4b6d918	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
5a1194d5-29f4-4689-b8af-8132d26c058e	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
8e18472d-09a9-47f2-a58a-b6579b9438a0	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
97bf3778-d6c1-4dad-b04e-d935d7594c92	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-01-15 07:04:37.14+00	2020-01-15 07:04:37.14+00	f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2
b8fcc796-9d2c-487b-a3a5-b64913918df0	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
c69cfdfe-e938-44ab-a0e5-5dff6dec2092	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
9cda47c6-cfa3-46d7-88e2-460855656b39	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
0df7d82e-c28a-4e01-91fc-74d77f73cfc8	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
21e07dcc-4010-485b-b951-7963e40e4c54	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
dc2edbe9-422f-44da-8a12-a3459c57e67c	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
d7895964-3cb7-4f00-8b19-f6919f67ea92	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
0a58d4f8-a326-4570-b944-3450dc447732	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
fc25375e-445c-45e8-ad3f-cc32f79ac07e	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
6c1550b2-8264-49c9-a5b1-624cd16ce294	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
026b0a9f-68e0-4ae7-9eec-66c6696c306c	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
c273ddd3-f8fc-40ae-8cf1-1933f5a25c61	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
1d38515d-e429-4a1f-bb11-b039175b65d4	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
6e65ae4c-9b63-4f86-862f-b6cfe174cbb1	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
0daf29dc-0ccd-4d87-8867-69e1ef78ef32	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
7ba635d8-15b6-40ec-83f8-0b21fb180e78	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
44d937e2-2de7-4fe4-bb04-f657caf412cd	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
7c6e863d-1b4f-4d75-8d27-2c6666156efa	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
17d7063a-5215-4615-8745-16996e236997	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
31a61025-1f99-4685-8019-972acd942dec	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
9e2c7b0c-3e92-4359-88ec-e9e1e6c3c4ac	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
b9cc1dae-85c6-469d-aad8-6983836213e5	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
6684cae9-408a-4f4d-97ff-811cd215edbf	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
8a222a25-b640-4841-99af-9e5f702ef985	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
ae76ca9e-d43f-4633-a597-352bb52cc5c2	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
78d22bbb-7218-4150-a326-6c1297336e43	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-13 09:57:37.763+00	2020-04-13 09:57:37.763+00	1b885225-2215-4098-9235-b01e6737b226
4491bac2-d1e3-472b-bf97-a91aee46f81c	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
be78ee27-58ae-4551-846e-171bca4766ab	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
0b98a30b-dd87-4c31-ba89-b6424216a38d	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
0c71f11d-e487-41ee-858d-ff57b2f0eafe	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
3ef592e7-5f29-4f72-bbc2-beb71c634654	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
f52ae48c-c76e-4bf3-ac2c-9d0d95b050f8	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-01-21 06:12:43.537+00	2020-01-21 06:12:43.537+00	ccdcfb92-7b5f-435c-8a5a-3b88b0466785
2b7f4ee3-a078-44a0-8252-21a52d42d8e7	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
f7af0af4-8309-4444-8372-f89e0684b1a6	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
0a8c1340-720b-4f14-a83e-4aed17730b0c	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
0cffbeff-2747-49be-90ea-99bdc318721b	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
24e8a181-6737-4ccc-8585-683f40cfce4e	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
e5c7d243-631d-448e-9040-a2887b21ea57	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
7e3cf9d9-47fd-4e12-81bc-d9f2e667d319	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
fb0650b3-7f2b-4e1e-a3ae-9b78fdd5aa38	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
4f33c6d7-e023-4400-8885-a4fc59a2191a	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
4700d5dd-7fa0-42ac-81cb-f01644ac29ef	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
94152bf6-6c02-426f-ac1b-9320ee71e27c	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
1d4b7531-ac18-4f92-9d1b-067e8b19d4d0	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-03 13:11:27.616+00	2020-03-03 13:11:27.616+00	06f1b6be-7200-4e73-af46-f05d8932fac2
fd0f386c-2130-4459-93b3-f8b34386f63c	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
5aaed9a6-277a-4a0c-a19a-72cf8688088e	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
17745d8e-6669-4bd6-928b-447b248e8976	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
95e15a64-f120-4bbb-82bb-a7329c7ee89a	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-24 19:09:54.759+00	2020-03-24 19:09:54.759+00	75861c88-70f9-4070-8970-7fd58237aa1a
1aa8da84-a672-457d-a532-1fc14af5fa71	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
05d40d24-ae99-4479-aed6-ac4dda30047a	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
024f66dc-b23c-42c7-8fe2-1c42819e4de9	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
20ffe109-3010-44b8-bc3b-0e523d075701	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
f7d489b7-8e15-47a9-9416-7f096f75bf5a	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
9614a187-f918-4d03-b1af-736bf5fa97eb	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
b42b4a95-a1c8-4308-a214-e51395bbe72c	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
7217b3c0-5fb6-4e9a-9ce8-8214b9086992	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
eb8bd482-a62d-4e13-acb2-e7af7f7c63d9	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
b1b5a994-dd9f-498d-9fc0-b6a1bb31e47f	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
d7f4a161-bee1-4f90-b670-7c55f2c01bb7	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
19fe2f29-d315-4eba-8746-8de1caede0fd	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-02-05 12:20:59.82+00	2020-02-05 12:20:59.82+00	8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d
60897e37-734b-48c2-8986-582b08d3291d	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
f674f93d-d6df-4730-a041-08db429231b6	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
2063e929-ba8e-4899-a22e-fec881eb0154	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
8d9f1b3f-bd79-468c-8469-bc27763a5632	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-02-08 09:04:01.491+00	2020-02-08 09:04:01.491+00	214b28d3-9ad2-4ecb-a5c6-8730c82f47fb
98f26fc8-75d9-4977-9c27-ef26ca9b59c6	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
d0d443e3-e681-4dd8-ad42-1b56e22c6438	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
4c55c061-940a-4f39-946d-5bb66870b3d1	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
a57621df-93e5-4945-89d7-773802b5bfd5	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
0153bc0d-0890-41f6-a2d0-72d2c5f9100b	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
adbcae84-d6ed-476a-9bbb-7a7467da1f06	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
b853ed88-d4ba-4e94-83a2-8d8c64c20ad4	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
49dd67b9-4006-4a2f-bbe9-9c71ecaf7d99	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
d3445320-3d24-4316-af21-e726ceb06e7d	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
b5a2a146-a7a9-46f6-b064-8c24933e1878	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
0e663d1c-a90d-4245-9171-a5ca0128b6ab	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
ecfad96b-e535-4087-8bb2-8702162d5e2c	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
8a50f89b-7fec-4f07-8d81-55869a55d8ce	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
b5fd6b0d-9fa4-43b3-a3f2-e09fa4333179	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
318312af-0bf3-499f-95a2-e1f4c96178ec	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
916e5acf-d43b-4577-aee2-238196416b67	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
001df0e6-8c7e-482a-9fb8-e45b72222f8a	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
51ece708-50d1-4d7b-9a57-477f342b07cd	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
189c5f89-0d67-40fa-a193-0482c9f473f4	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
2424574b-fbe3-4462-b2c0-543f105c5021	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
90b776f5-54b6-4111-a750-f6e9b4b05851	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
3ab5a426-30ce-4133-a7ed-ea98d95d9ac0	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
4f383b83-636f-44de-8301-ec9061e92a16	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
fea6c85a-4ef8-4c8e-8438-68183caa93f1	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
28a470f4-8d85-4267-8e9b-0a5e128caaeb	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
44d693b1-d68d-4538-b3d6-5771ed741281	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
5a5111e6-5d19-4f8e-9492-d57e15642890	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
11e107be-b356-483b-9ea8-84ff970f1e8b	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
4ed429ca-fc21-448e-90cf-b238e23d258d	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
7c093fcc-4903-45bd-91ee-114197940259	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-12 07:26:55.816+00	2020-03-12 07:26:55.816+00	\N
cfedceae-414e-4178-8eec-58c034ab2523	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
8c0c21fa-09ea-4530-840f-a039255440f3	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
d55aed5c-82f1-44bf-9896-f30af6aa9dd5	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
6597152e-ee55-42e5-aa98-21355b06fabe	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
74f69d08-8951-4e63-ad69-60925c448161	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
73525dee-8043-450f-909a-5ac979be85dc	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-01-27 14:12:25.823+00	2020-01-27 14:12:25.823+00	0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b
e362b6f3-59f1-4969-9671-9d6173d54e10	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
c1132d49-d330-4a51-9335-62188eb8e3c7	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
2219dda1-1004-45b6-a6b7-730eb9af86e7	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
76192570-0b68-4de7-a16e-5e4fca9cd185	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
c7e1a2a7-959f-4836-bc6f-8078a228ee24	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
05512340-4992-4c3d-9e98-e39a9cf96440	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
74d760b2-9fdb-4eba-91c0-bef74b305b9b	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
a0817203-6f42-4dff-bb4b-0a785c141d5e	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-02-19 18:24:40.308+00	2020-02-19 18:24:40.308+00	be48312f-af3a-454e-afd3-f6894b305985
678a90ba-9dea-448a-a320-555f032f80c9	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
c5a6fef4-6258-4de3-9915-64e9054e3862	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
9adf453f-da8c-41eb-a0c8-8e2330fd482b	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
016f9c1f-e6f0-4d47-b610-29fc9ecd119c	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
a8d6990c-9746-4ca4-91d4-de3dc2712ece	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
62ec2b4d-0326-4a13-9035-740bd6bccb16	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
be448311-47b3-4fee-abe6-1b411a49cf8d	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
3114336d-54cb-4bd6-9e39-ca2508f1ae26	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
77f72024-1126-4c29-b130-c6d80e5cd14f	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
4b16eedd-973f-41bc-972c-f96464bddd98	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
45c3e716-c809-4899-9071-89e21cdbdb48	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
d1eaa105-1713-497e-b0f7-70891ed11c05	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
44c4230b-a682-47ed-9cde-45150e291aa3	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
0ecb24ba-7363-4bd4-8dd6-79447328360d	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
a67a7e94-e68a-42c2-a678-262d63310fea	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
ce8f7a12-dffb-4b09-923c-801e06e2a6af	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-01-27 23:50:40.107+00	2020-01-27 23:50:40.107+00	467da7ac-d42c-411c-b95b-d3d28dae2e10
6ef36562-e7f7-4a57-a109-0d7cbd549b84	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
c7ab3945-74aa-44af-903a-d0a1f7b7e919	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
19e11978-dd29-4c36-9224-3d878c25aa0b	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
af0ee441-cbbd-4d56-86e8-3918ba4c7ad8	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
e1771d7e-dd93-4590-a310-ebb201c61a38	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
7f7cb9a6-5ae7-43b4-96a9-120977af5c07	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
889ea73e-7372-46d1-badb-1d070b0c99ed	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
3b412aa3-91c2-4cdb-8e27-29e2cc8b0a41	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-02-26 20:12:40.185+00	2020-02-26 20:12:40.185+00	78591a37-3a60-4acc-87fd-58d161dc4135
2164d22b-461a-48f3-98ea-a2717f1f24a5	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
3653ef38-bae9-41cb-8330-eebe81927430	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
3878eda1-3f96-4946-9e7c-7ed7e16c278b	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
1dc8f77a-6a29-4ce5-bb7b-c4f822f85958	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-02-10 19:52:59.948+00	2020-02-10 19:52:59.948+00	feb55d3e-1e75-4ec5-b10b-e698ae8f2836
8d09af05-02e7-4866-b1f9-b641f089a672	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
155b7f54-4d3b-4030-a563-fff1124b06f3	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
6d0396a9-55a5-4267-9058-f71e9a3a3c83	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
893e4f76-094f-402f-95c3-1cdb88f4a2d0	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-03 02:04:00.005+00	2020-03-03 02:04:00.005+00	2398904f-6f55-4ff6-b58f-d4277abdbf8f
afc78e20-b8c7-4730-ab64-708db756e753	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
c3648f14-51b1-44d8-8c33-13cc6c4cb3c7	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
52764dda-e515-4f50-a7d3-5fe8ae9e1a47	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
cdcabe4f-a3b2-4cb0-8fd8-3e6fd5827b0d	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
58ee1d32-7226-4180-92a9-bea89268b303	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
e35bc988-8bb1-473e-a53b-213c5932557d	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
462155a5-5851-4624-9ff8-692cc101bf8d	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
73897322-ce07-4e95-9660-fb3413cefd50	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
85137777-c42d-4258-9435-871d1ce92ce3	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
c4feb358-83e3-4f25-9473-6a4d549d6d7b	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
f268163c-d00d-4638-a1b4-4596e6735ba8	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
719a773a-168a-45b6-b71c-420b6ca65fb4	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-03 07:37:14.413+00	2020-03-03 07:37:14.413+00	6930a28e-d283-4cbe-8d9b-9aa7232487ee
d9f42a79-003c-4798-ba8c-c40068b0d154	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
70bb2aea-6612-4981-bca7-e17e35057778	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
2d994eb1-1879-409c-9b81-5e54ca35e48d	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
3e250032-91f1-49d1-a254-a45e908e7e81	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
e252bf4e-0f7d-4842-9056-f903e682c560	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
9cfba367-7ca9-4164-8337-4a03ad1dfef6	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
51ff3e5c-05d9-437f-bbf5-a6e2ac852147	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
367cd3ed-83f1-463b-a8fa-86d0079f7577	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
55aae6ac-17b7-4b75-a521-9fbebb27c63f	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
01b2d674-b1d5-4c0e-ac23-4473599b56d6	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
8128f039-4c85-452d-9ab7-e414ae743038	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
c9e622ad-5360-472c-a776-397d4da46d4f	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-03 13:15:41.972+00	2020-03-03 13:15:41.972+00	cddad6a0-e88e-44a7-b76f-336be98111ad
6a6d534b-f045-458b-95a3-0f7c44f7dc03	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
bbe94dc8-68ac-412d-ad60-dfd528bfb277	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
970f26b2-b263-4081-a14b-55b2ebbea085	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
69567cf0-4f74-40e6-9bd2-e0a0fe28e1fa	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
c6b2cedb-1a4d-4d7a-a35b-3ea558bca24a	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
44f497f0-53f6-49a6-901f-7ccbdcbfc7f7	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
309a7ae2-2b07-45e9-9baa-8550c1282a2c	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
182a8a42-0f00-4be9-9089-fc345152907e	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
1562a80b-179c-4422-bef8-ecda50cc8a02	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
0a0aa1d7-af82-48d7-beab-dfe1b0c423c6	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
3511506c-d082-44db-896f-05d49b7d1621	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
2ab4739e-1502-41b3-9cc0-ae230731eda1	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-12 13:38:13.689+00	2020-03-12 13:38:13.689+00	30a9c98c-ad5e-4f95-9f54-39512aebf323
b3f31551-9965-40f1-bca4-ad6aa0974e9d	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
4e18435d-6d27-4a57-9618-6897cf9e27cd	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
50f0bf23-3e02-44cb-aef6-0a3e6f82494b	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
32f6aeb8-ad7a-411f-962e-fb01129acb98	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
80ea0531-2481-408d-b77a-abb0db44439d	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
c329192b-7d6b-477b-a1eb-efcc48276e64	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
3c194d21-80b5-47f3-90aa-4e3e9e84a65e	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
6fe25684-92cb-4e13-9912-54e13e3d107d	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
9bafbe0e-459e-4ebd-bcf8-0912871cb9f3	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
68bcd272-8442-4928-b972-bdb6d276a5f9	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
d89da38a-4513-46be-a3a7-5c4a30c7489f	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
90f2c241-5019-4e0d-bb33-5926f651dee2	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
a1b648a7-2df8-4c35-a273-624407f60062	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
4a6e4597-7256-4105-8b8c-ba7f0e5285b4	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
8f567155-314e-4f87-9700-35436fd427b0	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
4ecaace6-c191-49eb-b7d6-168ea05222fc	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-05 14:18:27.775+00	2020-03-05 14:18:27.775+00	22cf7d8a-cb18-4876-bfd6-ceafb4019bed
a012a23d-64d0-4a78-b1bd-d009fbf5d045	quarter1	2019-12-31 18:30:00+00	2020-03-30 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
7e324c16-a514-4e00-b115-58c9d1698f3d	quarter2	2020-03-31 18:30:00+00	2020-06-29 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
6d72196d-795f-4bd1-bb95-9cf7c0748f9e	quarter3	2020-06-30 18:30:00+00	2020-09-29 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
5949f1a7-eff6-418b-840f-fc416772e8ee	quarter4	2020-09-30 18:30:00+00	2020-12-30 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
012dc0b1-bb33-4570-b06a-145d80beae01	quarter5	2020-12-31 18:30:00+00	2021-03-30 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
a1a17cf7-0f87-471d-8cd8-fe074c885777	quarter6	2021-03-31 18:30:00+00	2021-06-29 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
3749d23e-4a70-4cc9-95cf-1ef5c6eee8ea	quarter7	2021-06-30 18:30:00+00	2021-09-29 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
0edf1703-9fcb-44f2-a020-495f411c977f	quarter8	2021-09-30 18:30:00+00	2021-12-30 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
7fa7883c-0466-4681-a818-66499de191d1	quarter9	2021-12-31 18:30:00+00	2022-03-30 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
4edb6849-b18b-45f0-ab50-9bfe9b50213e	quarter10	2022-03-31 18:30:00+00	2022-06-29 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
2e7650f1-6ce1-4f7e-98b4-7417343addbc	quarter11	2022-06-30 18:30:00+00	2022-09-29 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
73ba0ef8-5929-4843-8938-0e0b0cff666d	quarter12	2022-09-30 18:30:00+00	2022-12-30 18:30:00+00	2020-03-11 09:46:00.397+00	2020-03-11 09:46:00.397+00	0b630269-4e22-415a-83b0-578c2fe60240
f31b1355-99e3-4eee-92a0-3a18c702786d	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
e745b7d2-d3a8-42ba-824d-a104d7337425	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
1b44cbc9-8367-44a8-acc4-206a3bed97b5	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
02dc7e81-6972-4b07-a0b9-bddfffb85e16	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
6de7d7b2-3fd9-432e-8fc8-941eacedbb40	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
4a0ad617-6b81-4f57-8c85-8291e0369fc2	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
120f8568-a71c-4e2d-93ab-1082746a00bc	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
8b411ad0-dc31-471d-8786-79415e2f61ab	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
88502e76-53d9-4fa7-9e46-5614446f47e3	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
62cf58c2-b4aa-445c-bcfb-9fc7b53fbbe4	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
269378f8-192d-4e8c-85c3-4730f1ec618d	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
8e7613ea-2527-435f-914e-885ebaa3acb6	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-30 17:37:44.096+00	2020-03-30 17:37:44.096+00	b6410c77-6c5b-4546-90e0-f8f0567c9d53
6fabb51f-6c69-4d43-a963-76923a5c14f8	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
68cd829a-633f-45b9-b76b-83c4e1c0431b	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
72796d53-e328-4d8d-bef5-91176719f820	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
8d8824d9-e899-467d-bfcd-74ce6549977b	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-13 06:49:02.804+00	2020-04-13 06:49:02.804+00	2272739c-7ef5-4e26-b848-17a66de0ec61
eba2df6e-2517-4ef5-b474-c61e6a7cd4fd	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
47e2b911-e6f0-43a9-b9bd-38f0158ac84d	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
4db57d95-5fda-424f-89dc-01cf2070a570	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
03a1e1f9-e6a7-4fb2-8aa7-e695dd6a5446	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
ce6d3226-5df9-4a81-abb0-8f95fcbb2e0a	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
9c59d6e2-da70-4dca-9132-b242ba8a3dac	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
ca870744-dd40-4c72-bcf4-1277d7273410	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
9e6c715d-53b6-4f64-b7b0-ad29bc1143bb	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
6e2b6c80-3a3a-4788-a247-04e6cdd1358f	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
55f024d6-8e39-4482-b01c-a24be067f805	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
3dafc6bd-63b2-4d2a-b888-a22d0167a83b	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
b615810e-3bc5-4f4c-b47e-917561c834fe	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
68df082f-6a41-4067-90e4-2209611b1a91	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
826d4bae-ef56-4529-bf1d-7e20a714d85d	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
d80b280d-a7d9-443a-aabd-31381f050c66	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-13 14:32:31.547+00	2020-03-13 14:32:31.547+00	25ea2de5-c4b8-443c-a387-8853e5c4a604
b32638c9-a2a1-457b-87ce-520829b49f24	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
0ae101c5-5492-414a-82e7-6e879220d91b	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
a563f45a-4100-44f3-a7a3-8e89f05c3541	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
bf9d7144-6863-4aaa-ad15-1bbd8e28d073	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
7e8cd251-b69c-4323-81d3-0a134e07e153	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
ff6e8338-5195-44df-815a-12575721b688	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
3c96e6b9-8bbb-402a-8ba1-3bec3d0827d3	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
e7218f21-ea45-4467-9c99-a34816b05ec3	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
576f5ca2-312a-4235-b511-7b52ad854fdd	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
781b16b4-f247-448b-9148-e43ceca4cddd	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
3a923e46-7400-4ec6-b267-9df89581be6e	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
07286b74-e16d-4f0f-a2d4-fba731c23914	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-13 14:49:04.274+00	2020-03-13 14:49:04.274+00	39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf
62db145e-1e48-45c8-8fd1-1ca2d959e2e4	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
922fcdaa-a7d8-4e78-9e52-ed7e1dad0de2	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
fefaa56e-355f-46e5-9a59-19c8d6a3268a	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
f9ebf61b-2b39-4550-9cee-2dfb0747c9c5	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
e6a990e3-1463-47be-bd1a-8d07228206c1	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
6d5af804-81a1-40e9-bd6e-dabd1cc9c288	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
54c527b5-5e36-40fe-8f4f-eec34c37f536	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
6e65e23e-21a5-4bba-a8b5-29a40178ff2a	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
a837227c-df85-4f37-98ba-ce478a4bf303	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
0c9acf98-839e-47ec-acc0-33e82397d394	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
8ebf9fb3-ebb7-4d22-9a72-373ac5e4b374	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
db4bd599-b7bc-4a51-ad45-3f617b939d76	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-13 14:50:58.583+00	2020-03-13 14:50:58.583+00	16a8b434-dad4-427b-b3df-a422ef253e4e
92a1ec8b-33df-46cf-b77d-f55b733851c8	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
7160eef5-4e3e-44e0-bc8b-34988e3a5c9a	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
1f1d8311-b101-42a2-8fbe-78fb95fc48d9	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
9f7cbd52-1a10-465e-add8-3b047ba002e2	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
15363d9b-0c41-4192-884d-68c77e7b5582	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
5065c802-685a-4a9f-ba4e-8e77769e6be4	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
d2fcff58-2c96-4eba-b44f-7bf8de7a92f6	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
9c9b2346-7822-44f8-9097-5d0ff9a287ce	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
63ae80c2-0df0-49e0-8703-573ee6ec554f	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
398ed18d-9008-4912-b82d-34cdd1e9ec24	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
3beff22e-8b27-44c1-b95f-22317d558279	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
9d2c50b0-7942-4258-888b-f3845b0d84d0	quarter1	2020-03-31 18:30:00+00	2020-06-29 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
3bbc55f2-bedf-416e-aaaf-23180dabc646	quarter2	2020-06-30 18:30:00+00	2020-09-29 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
b1a03cc8-2605-4452-bbbe-6abb00c390a2	quarter3	2020-09-30 18:30:00+00	2020-12-30 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
1488347e-5063-4dd1-abc8-0dbc6585d1c7	quarter4	2020-12-31 18:30:00+00	2021-03-30 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
613597a9-ae94-401d-97a3-0272af42d8cd	quarter5	2021-03-31 18:30:00+00	2021-06-29 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
68dcbefd-41d4-4118-aec7-1a53877723e3	quarter6	2021-06-30 18:30:00+00	2021-09-29 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
238212bc-b99d-41bc-b695-5c7674e117bb	quarter7	2021-09-30 18:30:00+00	2021-12-30 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
9a9fd520-df48-4479-81dd-40e5b3c6c63e	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-14 13:59:14.84+00	2020-03-14 13:59:14.84+00	003c4f50-1e19-47c8-ab67-d7db6c9cb0dc
7f663a2b-a05e-49f7-923d-e1b9ab1b2534	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
faafa8c7-77b8-4c6c-8834-cdf3462fc864	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
29fe0a03-f716-4bc5-895d-4668cdef4ae1	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
6b1bbb44-98f8-4dc1-bad2-4f85b02354d7	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
96fac13c-ba83-4811-99ec-5c0d729e63b9	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
954c6ce3-313a-4f60-83d7-7d73aa4dfdb9	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
2b92f5ac-cf1a-49fa-a0b1-c345d889c152	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
def38ddf-dc9e-4587-895e-bcd58abd4af4	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
6e061cf7-88df-4caa-a6b2-c8309e0d477b	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
114a21b8-d465-42dc-9af8-e68c6665cbb1	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
47acb72d-bdef-42fb-97e3-3e4b6922c551	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
a8990f30-5ce1-4d0d-b837-141fef4ffc35	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-14 14:05:19.79+00	2020-03-14 14:05:19.79+00	323905a9-4a27-49ac-af95-2938f9324008
4cd488eb-c7a5-433c-8a21-1dc2ddcb72d0	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
7587d985-5173-414f-a14d-17cbe536b4e8	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
eb32b895-d9a1-43f8-8723-4043f506b93b	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
38f254a0-95fd-4eeb-9aa2-67aa82448be4	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
f893e9b7-70c6-4651-96d5-e11815c2a4e8	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
5924bf4b-5c56-4e16-9c41-0744fefeb14b	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
3413eb4b-ffd9-42e2-bea2-6a33e3a84b81	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
d5fa13b3-675f-42a7-ba78-e7ce7d8ed72a	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
a937b070-e1b0-4c4e-8617-5f84466b4db4	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
b7d7df90-5953-4732-87d8-fb2300129798	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
5aac7b71-8e58-4a2d-b8a7-3c7cb228a6b8	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
d933407f-6ee3-49f7-a8f2-ab6ce7cf8ae8	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-14 14:22:51.095+00	2020-03-14 14:22:51.095+00	c387a67a-ee1f-48e8-85c0-8970040ed701
589b5480-6f86-46e0-9ff3-8f48fc54c846	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
9afdc786-0c0e-4112-a52d-9e8600517423	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
1bcaa04b-0bda-4a38-b2c3-4c5f4fd367d1	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
f16cf9d0-5008-4fbf-b129-3beb596ea960	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
b6745a7d-f456-4d80-a36a-af3a57502fae	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
d4461eb3-bb7e-4022-a9e2-ba22e2716afe	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
a7c8f09c-426b-4599-aca1-dd884b8c3418	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
5619ef39-3132-46a9-8ecd-75393cec63d7	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
1755673f-9d45-437e-b506-e4cecef2f495	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
64fa8505-2d67-446a-80e8-9c374076dc9e	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
d4629da8-ca19-4fc0-9d62-83060cab0596	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
0596557c-acc4-4931-ba14-1fd6cd29bbac	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-14 14:28:29.347+00	2020-03-14 14:28:29.347+00	03e327ef-7ebe-4891-b7bd-9f4c531a5996
e0122dc7-4cc2-48b4-ac23-28368e650bbe	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
0a9a480c-d7fa-4062-8017-74e6b54c4c08	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
1a34a32d-499e-4536-a114-e31a7b2e19f3	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
f657bd93-3a0a-44c4-a603-4c4ce142db7e	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
79764a6e-fa3f-42ab-89b8-3d05adc5fcf4	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
65cf024e-4175-4b1b-9a8b-659db385486f	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
9fd3b6b2-ec8d-4228-9650-7a29f852f012	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
1e23eff0-d74d-441c-a480-50998b73f774	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
db52e41c-6055-4fde-af10-837250c6133b	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
fa5ec2b4-2956-4b76-8f66-3cac2ca34670	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
0bd83cf8-e357-40e6-a228-fb67baf523bb	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
e702b3b8-0341-448a-8700-80ccaf4bad67	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-16 15:14:53.959+00	2020-03-16 15:14:53.959+00	bf6cc364-57e6-4e24-aff2-588dfe9dc1f0
fea1f16b-9b2c-4d9f-9349-408fa1b3699c	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
c4b54c14-12fb-44dd-acdb-2751096b6f18	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
64cf5395-0650-47cd-8416-0c8bd9e2b0fc	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
9c94f185-a489-4ebe-8d99-866565af809c	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
00131da3-9abf-4f82-957b-c7b697c6202e	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
53f40987-bc12-4e8c-8468-ff8125d4b7a2	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
8511d6b8-ac87-4c56-b415-8c1965bd825c	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
0c47de60-bd64-4275-8f00-c3b950f93a31	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
1bac813a-b178-4114-8601-1add72b1abff	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
fba0a74d-aa0a-4014-9334-809bbdf853bc	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
4333d04a-d112-457c-9849-018e7f25d909	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
15f65a77-0d51-47cd-b245-3c1eb0c4d8dc	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-01 15:30:12.666+00	2020-04-01 15:30:12.666+00	1715b788-b5b3-472d-a9cd-d17b64756181
dc8225a4-e602-46f7-a388-b251eb3757ea	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
b2c8112f-1bb0-41e1-8e80-155d01f9141d	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
02178bb5-f7f2-46b1-8b2a-52b8f88b6eff	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
60e807cf-1791-456b-858c-e80cf90efc0f	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
e76ae343-62e2-472a-905b-f8427a9e8655	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-13 11:42:25.434+00	2020-04-13 11:42:25.434+00	432f19e0-77c1-4d3c-aac6-25123409fe5d
e1215ea7-cf12-43a9-8610-95c41813a32c	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
a0311bc1-0614-4974-89ed-792c7bebcc6e	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
ea41a864-4319-4e23-b7ec-3fa83445892a	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
62db87e0-a714-4a29-a1d0-a386657d1f14	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
902b204f-7f2a-4fde-ad7f-5bc656196da9	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
62324f4e-a5e2-45de-afff-d9d22bd75d9b	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
8981ecd2-81e5-470d-873f-3b35c9707527	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
34c219fb-a98b-41b5-8730-9a6c3673c006	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
8520bbeb-bb2a-4624-bd50-c06e0dbf4d4d	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
3121b291-55f2-4ac9-80df-1c086a06d46b	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
c4d77704-6acb-4d21-8d1c-b16bef513216	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
f406fc0a-376e-48ca-93df-702c02515ad5	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-17 10:31:21.124+00	2020-03-17 10:31:21.124+00	8335cd68-a734-4dc0-afdc-94828172fb54
2740c070-6ea9-4988-8dc0-904ba4f9c277	quarter1	2020-01-01 00:00:00+00	2020-03-31 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
d0e8bf34-b397-40db-9417-f41bd7c6cf09	quarter2	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
4a67c53c-1e9d-4e62-a319-0fe183306343	quarter3	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
0362d3e7-a3d6-46c3-b2c9-6e904b77d585	quarter4	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
3491cfa2-705f-4f9a-aab6-47c71280df91	quarter5	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
d3285188-6b39-4aca-8e4c-e6a86a714781	quarter6	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
c1067fea-7cb8-461f-bdac-2b13de4f07e3	quarter7	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
d982f0e2-a41c-4633-8d05-1172014a84e8	quarter8	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
7ac878f2-7144-4b43-b6fa-8643eff5aea5	quarter9	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
f9a73736-e01e-49bf-b838-0ae21aaa6d4b	quarter10	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
e4f41594-43a1-46d1-b89a-64e758e2d2fe	quarter11	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
f79c49ba-0d7f-4fec-a679-253cc8418d9c	quarter12	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-03-17 11:00:38.193+00	2020-03-17 11:00:38.193+00	a4a88578-13a5-4c27-9ea4-d936f710be4b
36fabc33-7b7c-4845-a8fa-a8c99cf81a1a	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
36328127-e2c7-4a3c-9a00-ef03560c08b6	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
7910f061-1073-48b6-9696-b602a9bb25c4	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
d8980ed9-719d-43d3-8553-bdfbd77d7829	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
be9cd060-b50b-4cce-8827-8befde917f8d	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
1658a557-7a87-48c5-8d01-87884ad42c2c	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
0c6b3cdb-a297-4e9b-a805-c4aaf2b556da	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
b200379a-b4a9-49ce-a4a2-d2753bf6ee8c	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
97ece05a-a9f1-4c99-ad8c-e93f1974764b	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
bf8ac8a5-278e-4a57-8a50-dfe429a187fe	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
c87ab393-ddf4-4207-82ab-eded686681dd	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
68e1fc95-10ba-4649-b150-66e77ab1793a	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-07 13:58:17.438+00	2020-04-07 13:58:17.438+00	c53c73ae-840b-4e15-8a57-4dd232fb1282
94e2bdab-6c62-4a66-bd02-f4c2c39c0384	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
9ddb5065-b051-4b89-8e1c-8311d55c8ed6	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
5fe0d50b-c2cc-462c-af66-9cc07d425461	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
20a989eb-06e0-4de0-bd89-f1315d03b027	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
1ad26975-a093-42dc-84dd-dd83f18263bd	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
8a5189b4-ed33-4cc7-ba64-be0de6ec19c5	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
0b8d3395-580f-4e9f-9464-36159a38900a	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
51b08e7b-51ec-4f60-8432-fb5f68004a3f	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
6d7dd986-39c0-4d47-9172-eb729547772c	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
bfe1ff91-ee69-4c4d-8a88-c00064710ca2	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
d1e592b5-7070-46c5-a1a9-81d2728b442b	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
e13b9cd6-bbc8-468c-8e66-9a38ea7d09f3	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-09 05:23:52.635+00	2020-04-09 05:23:52.635+00	66e822ab-bea7-422c-bd66-2edf477a7511
2a501ceb-30a9-4467-861c-b4ce6a96c53a	quarter1	2020-03-31 18:30:00+00	2020-06-29 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
55f46cf5-c00d-4dcb-87f2-217d76c95ea7	quarter2	2020-06-30 18:30:00+00	2020-09-29 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
d79bc248-c36f-4f88-96e2-fc1e02457cfa	quarter3	2020-09-30 18:30:00+00	2020-12-30 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
4c47f857-9a47-4723-ba21-f3e17a61a91e	quarter4	2020-12-31 18:30:00+00	2021-03-30 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
ec865abe-dd3d-4fb9-8c9b-8ef10c2e021e	quarter5	2021-03-31 18:30:00+00	2021-06-29 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
ff726ab0-69fc-4b42-98ec-0ee619556069	quarter6	2021-06-30 18:30:00+00	2021-09-29 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
ed459ee6-10da-408b-ac75-fb050b4e6efa	quarter7	2021-09-30 18:30:00+00	2021-12-30 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
56e37124-ffe1-498d-93c4-48df1a8f9921	quarter8	2021-12-31 18:30:00+00	2022-03-30 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
c1db93c0-67ac-4665-b81b-657e84a73e14	quarter9	2022-03-31 18:30:00+00	2022-06-29 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
81e32727-87b4-4ef0-8e12-86e77fd00fe8	quarter10	2022-06-30 18:30:00+00	2022-09-29 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
f45fca3e-7f86-42f9-a9cf-7db04d189d99	quarter11	2022-09-30 18:30:00+00	2022-12-30 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
4fbdbd59-c135-43a3-8032-1967b88253e9	quarter12	2022-12-31 18:30:00+00	2023-03-30 18:30:00+00	2020-04-09 05:25:32.486+00	2020-04-09 05:25:32.486+00	fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6
b1a6561f-14a6-4e51-9711-08415e94e3e5	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
e58fa596-e1a9-46e1-b4a8-34b12750bc5c	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
c5edd4c3-9722-4c33-9e99-7daf0598ff37	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
0c269420-7615-4e76-a87e-b2a750589774	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
506d9eba-d482-4c4f-bd25-6dae6f40d7c2	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
4ba85a89-e931-4525-8f5c-2e8c8306b31c	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
43ce2426-d4b8-428d-bb0b-81ece7f700a0	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
7e9845e6-3ac2-4f0e-8ac0-b73a7588da10	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
e916b132-49fb-4127-9780-d22ac5ffa837	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
a4df323d-130e-4a3e-8534-29e8309bd40d	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
33e62ce3-2c76-4b31-baca-8dc3caee77be	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
a2b44b4e-950d-4a06-b78e-cbb58ea2ff3b	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-10 15:07:53.427+00	2020-04-10 15:07:53.427+00	899e4a90-56c3-4878-ad45-4d2213abfca7
1317df03-52d3-4e91-9dc3-0ccdaeabc75e	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
0e178773-80ea-4a47-b906-ee1b677381e9	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
ac42d35e-5599-4f33-89aa-aa9482746733	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
808e3381-ff91-46a9-b228-8e8528410bc3	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
b9d87d4b-fc62-4154-8dea-4a08d6953634	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
e75a812f-d950-4fce-bc26-09fbec8a1475	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
3c48ce08-5123-4aed-83d0-78acfca863a3	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
0b936744-175a-469b-8b5c-d4b887c7ceca	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
35bfcee2-991b-44b6-bc06-0bcbb5c65caf	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
7a6dd781-442d-40b2-8ba2-eda20cc79d5e	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
540fc6b3-cfc2-4397-b53d-6023038c387d	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
3819f652-144e-48bc-9e6f-dc4871710bb3	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-10 17:12:02.762+00	2020-04-10 17:12:02.762+00	f810e2d7-bfee-43d2-8750-e392eb4cb007
5b0d57cf-b184-4709-81d3-595fe24e76d5	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
a2aba185-8a7d-420f-af5e-5946b6a22b81	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
de47c888-5150-403e-9161-7402aa934cf4	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
a5447cb1-e717-4755-9ea1-394a34ab4814	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
deb63d2f-bcd3-4a3c-b2d5-15b7bf949be1	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
c4a509fb-8164-48a3-a70b-5ba481c829da	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
6d77bc88-c5ed-4e33-9f20-5939e15226aa	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
1d817f94-add4-48d5-95f3-ad455a343c11	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
bf36454d-2731-4c70-aa84-dce5a07c9927	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
f2f18978-9440-47b6-bd5d-169864b4df01	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
7fe092a6-e004-4922-a601-65a0ed4e014e	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
c8efcac0-2c26-46e8-b2c7-b32829c65ccc	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-10 18:17:09.173+00	2020-04-10 18:17:09.173+00	3a64764d-07b0-4b9a-9e2f-267a946e6cea
1ac657d0-b62d-461f-bea9-eb9c7247ff12	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
db8096ba-d363-4a8a-adbc-cd8d36a55e2b	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
02179e92-c627-40ff-853d-982ae7e7c4c4	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
ffb801e4-7e00-4902-a2ba-5fcac79bca6a	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
79866127-28b1-4b24-85d9-8b07681102ef	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
0cbd94de-82a4-4d22-bade-fdc8fb8fe083	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
0999f27d-532f-413c-9f6a-0cce10a70d1d	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
f527484c-d9b0-4e86-a6f8-669ee5bbdb19	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
52a0efde-5aea-4e53-a4cd-2b5cc18af6d8	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
333a8021-e32b-4459-a44d-6cedbeee7e9f	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
1016f4b1-1ff0-4e3e-ae16-dc8e3c4e7002	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
d759ae4f-3d80-49ef-8b32-3cceceec0d0d	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-11 10:58:59.5+00	2020-04-11 10:58:59.5+00	2cf60c89-1d80-4fa7-83c0-3140876f0933
b0998815-1b98-4dab-a295-596a3f724bb1	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
59619fd5-4482-40de-9abf-271a59decb89	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
7ddbe9b5-7817-4711-b703-f78574b91a75	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
8fafa529-eb2a-4cb2-a8ef-95eea0ea8fb4	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
e6feb682-98a2-4685-ab0a-e92b6ca3e4df	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
d730ab25-4b8a-4433-8775-cfa802bdef71	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
0f3eadd0-99b2-4cc4-9c61-ada1d35079fa	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
21c6d36a-71eb-4972-80b5-5f6d04c30a46	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
8d090b60-22c0-494a-8906-9215d69f207e	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
33ebc044-e0b2-475a-b398-917a302cd40f	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
8f1d6d8d-26a8-4ee2-8108-f7fea4fff9d1	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
3dc6b89e-94eb-421e-8d9b-241bc8db477f	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-11 20:03:23.488+00	2020-04-11 20:03:23.488+00	f6f09a86-44bb-4364-8338-b483f4ab02a0
2b431c77-b7f1-4950-9418-9ab26ef05336	quarter8	2021-12-31 18:30:00+00	2022-03-30 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
820d4a29-3669-4f22-9168-9fa55b9ae51f	quarter9	2022-03-31 18:30:00+00	2022-06-29 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
846b4150-6c87-4c69-aa50-773072a4b34d	quarter10	2022-06-30 18:30:00+00	2022-09-29 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
0b120ed1-c686-4b24-bc0d-6bdd137c9be2	quarter11	2022-09-30 18:30:00+00	2022-12-30 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
f46d0d44-6c4b-49ff-b6c5-0b525f231f33	quarter12	2022-12-31 18:30:00+00	2023-03-30 18:30:00+00	2020-04-14 05:25:38.797+00	2020-04-14 05:25:38.797+00	94eb5e7c-4100-4d6e-8caa-63815eff76b6
a1258eb8-0b4f-44f9-884a-8842c93e3ba3	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
2b3ce417-c0b9-4b68-b002-c8185c9c5c45	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
121f2a27-ec14-4708-a4d8-7acc2fe6eeb2	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
ab19cf1b-25a0-4df0-9516-1595f0c63b96	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
7087e2bd-fc08-416a-ba3e-473b490e2e07	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
852093e5-b959-4f0b-95e8-d225e296eee2	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
bfc52d3e-b512-405a-bd3a-652ccfdf35c6	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
3452cb01-d35e-495c-9512-e897e437c5a8	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
55bff09a-4950-4b01-9946-a68cf1ad27e4	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
150cee6e-d0a8-4ae5-813e-eb263b2339fb	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
043a35c1-1102-4291-8b92-515836ba9370	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
847a7476-4268-4135-9c2c-df930d1fc939	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-14 13:08:24.938+00	2020-04-14 13:08:24.938+00	c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0
8a52b359-a65f-4095-a5cc-b3f50b208271	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
1b42bf9a-4875-454d-8f28-592d0d480abf	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
24cb7c42-94b1-41e6-a5c6-0062f2b918ae	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
2b44d270-47c5-44fb-a3f6-f781d5357875	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
5d841e5d-056b-42bc-8d88-132de117bb32	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
434f6290-1e32-44c4-8741-1288203ec0bd	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
27d711bd-ab95-45f0-8ea6-c806974879c1	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
8b8d51a3-13c6-40d2-a136-40aa527550fa	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
4c6006dc-299a-4ce1-b83d-e8bf2ea6955d	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
c406aacd-7c32-4842-86f9-4a25adadfe8a	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
9dd84e0c-4c77-4baa-92d2-c00f34db0205	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
ec7b5b10-cbb8-41ec-a9e5-0a6cac98e412	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-15 15:21:19.893+00	2020-04-15 15:21:19.893+00	abe27836-ff9d-4408-a65f-3023f936bfb8
312ad772-2994-4998-b874-6a21e15940fd	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
1f39618f-038e-4869-a9e8-0fe56d9b94d5	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
ef12c781-42e0-4e05-89e7-581b49881c1e	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
856eccc6-e72d-4987-99b6-e11e1e137fea	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
ba320201-aa96-4c5c-89ea-c8d122e9e93d	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
7a5da423-f522-4202-b604-f2c95aac5fe6	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
55b74d8c-1dd6-4963-9427-20ab72102df8	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
fd80ec3b-cfbd-4798-845b-df25b9d8ade0	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
810b7097-d77b-4aa3-aca2-9576e4a5669d	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
0baf8d96-e5ca-445b-8d25-b4471b980103	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
08fecdad-559f-4ccc-85d4-7c55aca85659	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
f248c75c-cf68-4cf1-80f1-732d06fe4fae	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
11c0c8eb-fa68-44ee-85a1-7948b2f5d9ca	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
f3f27f0e-5c5d-451a-ab74-d3e8a0da54c9	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
5e18ad79-92cf-44ae-87ae-a77ddf6ceb6d	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-13 15:48:32.368+00	2020-04-13 15:48:32.368+00	fcf38be9-bcd3-4643-9352-43902831f654
436fb994-8db8-4f7d-a029-323bf845466b	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
3ef73634-d92e-471f-9119-aa4efbbfd681	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
8eb31f9f-3a29-4408-a80b-ff53f7c9da3d	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
af970071-8662-4c2d-8484-9b32796d4446	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
8a105434-8473-4fe1-ae6d-ed8cf7685923	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
32d72d5b-cca5-4e50-88cc-2bdf91d08ec7	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
06c05686-ca04-48da-8cad-481dbe130e15	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
e38f0daf-bf13-419a-bd5f-4b16f560647a	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
eadcad73-e1db-428c-b3ba-58b5a1592b1b	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
9a0dcec8-33bf-40ee-bcf4-c38d97a8217b	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
deb831c6-47b7-46c4-9ec8-5895f7c6ab81	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
31d932b5-1ac3-4d5e-b98a-daa8fc2104c2	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-14 12:53:19.638+00	2020-04-14 12:53:19.638+00	41d8c12e-9ee6-4a53-8236-00ddc93b5da5
63750f6b-2158-44b9-9391-0ee37558022a	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
d1fb9917-7d54-4271-bb8b-6fb433a7811d	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
fc04146f-3d47-4b30-8f98-f2926ccd22e4	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
10df6ef5-94c2-4d45-8ef0-e3fa0a10f59d	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
5341d21a-546c-4f02-a0b7-493ba3908b68	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
ac266e32-acbc-4cd2-bd07-75eb3bf525b0	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
da640f13-3e5a-47f2-901a-a217c0008012	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
54f928c0-c7a2-411b-95c6-a3545ef2a95f	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
a1312360-d2fa-4792-a366-bbc8a70288dc	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-16 09:37:47.82+00	2020-04-16 09:37:47.82+00	c9f06ec8-e835-4e9b-8997-6705999c8bb5
0b97ab95-aad4-4b1a-9f18-600b1520ab4e	quarter1	2020-04-01 00:00:00+00	2020-06-30 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
71ea887f-660b-4039-8708-5341319fe19f	quarter2	2020-07-01 00:00:00+00	2020-09-30 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
a637ffda-6d2a-4c7e-8ed1-3ffe068ab23d	quarter3	2020-10-01 00:00:00+00	2020-12-31 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
a8516dbf-501b-4bca-958d-f79ea76ca00e	quarter4	2021-01-01 00:00:00+00	2021-03-31 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
da9934cd-61f1-44c8-8199-ccda7516e5c1	quarter5	2021-04-01 00:00:00+00	2021-06-30 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
8fc5449f-1838-4479-b171-78f339ddb808	quarter6	2021-07-01 00:00:00+00	2021-09-30 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
608914df-60f3-4be3-9928-84affed53f61	quarter7	2021-10-01 00:00:00+00	2021-12-31 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
05df5561-e955-4ab4-9029-ef8926663c27	quarter8	2022-01-01 00:00:00+00	2022-03-31 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
bfb43411-e1be-43a4-ba73-c1648eb1ba27	quarter9	2022-04-01 00:00:00+00	2022-06-30 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
0a7ac098-cf36-454f-ac3d-be0f61123d5d	quarter10	2022-07-01 00:00:00+00	2022-09-30 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
c15acda9-2808-4331-b561-8272c8011620	quarter11	2022-10-01 00:00:00+00	2022-12-31 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
8d1d7a87-1edb-44d7-acf3-9538d36134f4	quarter12	2023-01-01 00:00:00+00	2023-03-31 00:00:00+00	2020-04-16 09:49:45.316+00	2020-04-16 09:49:45.316+00	1ca41177-5d2b-4507-9fb2-8e32b233f32a
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY questions ("queID", question, "isActive", "seqNo", "createdAt", "updatedAt", "qtID", "driverID") FROM stdin;
\.


--
-- Data for Name: questiontype; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY questiontype ("qtID", "typeName", "createdAt", "updatedAt") FROM stdin;
936ae0d5-2673-4c35-b7ad-0cf70cea801a	None	2019-09-25 09:30:16.637+00	2019-09-25 09:30:16.637+00
977bca4e-1c37-474b-9791-1409018f9b8d	Single Choice	2019-09-25 09:30:33.515+00	2019-09-25 09:30:33.515+00
de46fb02-1959-4067-97f9-bf4b3fddb3d5	Multiple Choice	2019-09-25 09:30:50.375+00	2019-09-25 09:30:50.375+00
6e210430-bec8-4e21-b49d-a859982ffb04	Descriptive	2019-09-25 09:31:02.588+00	2019-09-25 09:31:02.588+00
23921a23-2aac-4d96-b1a1-faeba9118e9c	rfp	2019-09-25 09:31:02.588+00	2019-09-25 09:31:02.588+00
\.


--
-- Data for Name: remainder; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY remainder ("remainderID", "remainderType", "time", "createdAt", "updatedAt", "kpiID") FROM stdin;
\.


--
-- Data for Name: rfp; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY rfp ("rfpID", "qSelectID", "createdAt", "updatedAt", "queID") FROM stdin;
355b6519-5495-4602-9335-68920113a400	ad36bb31-6fda-4121-9eeb-6359d42aa050	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
2ca2e42d-2d35-4b1a-a022-11e31d684f8e	29af3399-03fc-4e93-a96c-6eb45c9d21f3	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
2633e155-9817-4454-aab3-b4a8578ec0bb	6728ec6a-5c5e-43cb-a3e6-5c18d65980f0	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
4a56a227-5126-402a-98ae-9887b544c9fc	36c3a14e-932e-45bb-bdb1-54bb080ce3c2	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
bf64b011-0785-4d28-8f70-42263745d7e1	d681447b-4665-41b6-b71c-4e262cd87167	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
da1153df-ce7d-4027-88a5-c11efc385a9e	500b0f1c-76e4-4696-8e4f-87367c5d6a7e	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
2cd545a6-82f4-4f04-82d2-fac31d8aa5b8	1a607136-70eb-4a19-a814-9d030c78b6eb	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
034c2fbd-93a0-4811-8d6c-e548451db19e	2d27e320-8ef4-4037-b564-65d82c47de12	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
07d3f784-4bfe-45f7-9c30-a24e7ca8bcaa	e438be87-43bd-43b9-b10e-b250c489c69a	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
368f4ff4-e940-43b5-9415-9ffcb04444fb	71b87152-5b2c-4f7c-8733-0a8c055e399e	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
9fbd6c46-419f-4dba-970f-fe95078e877c	ad947a09-3876-497a-a0c6-c4499e92db77	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
826f882f-df14-4c8e-b13f-b4c96f873552	4f272d84-b3a9-4a2d-ae7d-a08e739e81e1	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
33be6071-6a2f-4aea-ba63-68cb5a7232ab	571b7ae7-e577-4414-a90c-f30e4b9e1557	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
2eae609a-bb6a-4c5a-84c9-2a41566d5f76	78ee6781-b814-4d9a-bd52-3d7341115fbd	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
f96cf411-e066-4d39-a6ee-ec92d16691cf	865c68de-dad5-43d9-907c-c10fa0202512	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
c53f9078-ed7a-41f6-ba09-c4b3ce400a70	ebcfe393-586b-4815-bf2c-11f4afb4f9e9	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
dff1a36f-8704-4274-9a60-91a82cdb92e8	c9ed3188-2008-4d17-87c3-a74f53d0e3af	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
0b046f64-0316-4cb2-a188-c48750726919	403708db-0c63-44a3-ac52-4aa216a2bb56	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
45791bbf-c403-41ee-aa4d-a52605028c93	c58eac3d-fff7-4404-82bd-d7771c5e702f	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
2834588d-bc80-4602-92f1-b36e8de0dae7	81bcbb43-b605-4faa-abec-33fe75e1c7a2	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
7b6b55c0-aad2-422f-b725-298b94dd577e	2b02eb0e-47d7-4ab3-80c8-da396d9618ae	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
0f28258f-3683-47cb-9bfe-6a34a7333ca2	452766a8-f082-4af7-a812-0b941cccc7b2	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
a84389b7-e670-442f-b8e1-3eaee15288db	ef087b1f-eaf0-4638-a700-c9d6619af000	2019-11-05 14:20:33.835+00	2019-11-05 14:20:33.835+00	\N
9955de54-6f95-4b46-a729-2ce6600d5a4b	ad36bb31-6fda-4121-9eeb-6359d42aa050	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
f7c96392-f320-40b7-917f-9781623016fb	29af3399-03fc-4e93-a96c-6eb45c9d21f3	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
71dcd819-ce53-4943-82e6-f9abaab679e1	6728ec6a-5c5e-43cb-a3e6-5c18d65980f0	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
4155341b-1b1a-4c54-91e1-3be531e6fd34	36c3a14e-932e-45bb-bdb1-54bb080ce3c2	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
a132ec12-6d55-4093-a10b-901e8f2652f6	d681447b-4665-41b6-b71c-4e262cd87167	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
694068d1-1301-4157-90c0-c12724e372b8	500b0f1c-76e4-4696-8e4f-87367c5d6a7e	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
d39d9fcc-2b9d-452f-9c4c-130bffb76f7a	1a607136-70eb-4a19-a814-9d030c78b6eb	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
ad6e6f46-59d4-4bc9-96b5-2c190aab1cf8	2d27e320-8ef4-4037-b564-65d82c47de12	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
c01bdeda-7c30-40dd-aa95-ca7560aa6031	e438be87-43bd-43b9-b10e-b250c489c69a	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
abd51fdd-1367-4baf-805d-dc55dbd6cedb	71b87152-5b2c-4f7c-8733-0a8c055e399e	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
f047f7c7-55b1-4826-83bf-dc727ee6a58c	ad947a09-3876-497a-a0c6-c4499e92db77	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
d17d22cc-2240-4083-a171-f3517718ffda	4f272d84-b3a9-4a2d-ae7d-a08e739e81e1	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
8b146076-9d8c-4cc8-b03e-489834109ce9	571b7ae7-e577-4414-a90c-f30e4b9e1557	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
a15dc10d-52c3-44d1-a6ac-823ff3211223	78ee6781-b814-4d9a-bd52-3d7341115fbd	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
c864a308-8d0b-46e7-8625-7845c46cc6cf	865c68de-dad5-43d9-907c-c10fa0202512	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
90e059dd-5690-4e7d-816b-53609afacf62	ebcfe393-586b-4815-bf2c-11f4afb4f9e9	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
c258bf12-ff84-41e8-80a9-35b6fdb38ba1	c9ed3188-2008-4d17-87c3-a74f53d0e3af	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
acc200ef-b81f-4415-a8f6-bc5c457d3832	403708db-0c63-44a3-ac52-4aa216a2bb56	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
c13d6252-c3aa-469c-82e3-9c522210d846	c58eac3d-fff7-4404-82bd-d7771c5e702f	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
257b63b5-dfc5-40dc-957e-0974dd05e8b9	81bcbb43-b605-4faa-abec-33fe75e1c7a2	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
e5489584-c843-49b7-be9a-7631ad744b76	2b02eb0e-47d7-4ab3-80c8-da396d9618ae	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
125e9fbc-5a17-406a-8b88-2ff533be1d72	452766a8-f082-4af7-a812-0b941cccc7b2	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
6fbba636-697f-47c6-b0be-f223b7238bff	ef087b1f-eaf0-4638-a700-c9d6619af000	2019-11-06 12:56:30.326+00	2019-11-06 12:56:30.326+00	\N
d4cf71a6-808c-4eae-86c9-0c0870b9d754	ef087b1f-eaf0-4638-a700-c9d6619af000	2019-11-11 14:51:09.152+00	2019-11-11 14:51:09.152+00	\N
d551620b-f739-4d92-8d1a-660cacbf6e55	ad36bb31-6fda-4121-9eeb-6359d42aa050	2020-01-06 14:37:45.644+00	2020-01-06 14:37:45.644+00	\N
4e8aea41-f497-4977-9575-c42db53079f4	29af3399-03fc-4e93-a96c-6eb45c9d21f3	2020-01-06 14:37:47.154+00	2020-01-06 14:37:47.154+00	\N
daa8778e-6541-415e-b353-d78a4686d06b	6728ec6a-5c5e-43cb-a3e6-5c18d65980f0	2020-01-06 14:37:51.971+00	2020-01-06 14:37:51.971+00	\N
ec4dda5a-b1b4-45db-a580-d76803dac5eb	36c3a14e-932e-45bb-bdb1-54bb080ce3c2	2020-01-06 14:37:58.676+00	2020-01-06 14:37:58.676+00	\N
6424325a-38af-48ff-b71c-e3112712fe5d	d681447b-4665-41b6-b71c-4e262cd87167	2020-01-06 14:38:05.563+00	2020-01-06 14:38:05.563+00	\N
8dfe815d-87c8-4c73-aeef-e46a8126d0a2	500b0f1c-76e4-4696-8e4f-87367c5d6a7e	2020-01-06 14:38:12.776+00	2020-01-06 14:38:12.776+00	\N
9774b87a-f3b5-4b15-97a8-dcb3dec75936	1a607136-70eb-4a19-a814-9d030c78b6eb	2020-01-06 14:38:25.17+00	2020-01-06 14:38:25.17+00	\N
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY role ("rID", "roleName", leval, "createdAt", "updatedAt", "depID") FROM stdin;
be2727b8-1725-4350-ace5-d3de9d887c43	Director	L3	2019-11-06 14:38:28.072+00	2020-03-09 13:54:24.656+00	dfd1c7a0-ce1e-450d-8ef0-483972d19251
1e673942-3456-4dde-84de-8c2b109656c3	admin	\N	2019-11-22 07:17:40.085+00	2019-11-22 07:17:40.085+00	\N
e5f82e78-5b62-4702-9ed8-34c808c6190d	admin	\N	2019-11-04 13:06:12.172+00	2019-11-04 13:06:12.172+00	\N
ad993986-53e6-42e6-b9dd-fc840b209678	CEO	\N	2019-11-04 13:07:05.593+00	2019-11-04 13:07:05.593+00	\N
b01e6cad-5ef3-4470-8dfc-29ff9a4cff41	COO	\N	2019-11-04 13:10:17.782+00	2019-11-04 13:10:17.782+00	\N
421870e1-8f7d-4125-934b-293e5145648d	admin	\N	2019-11-04 13:17:26.901+00	2019-11-04 13:17:26.901+00	\N
4bcfe748-5c7b-44b8-99b6-3c3fba24c0e3	VP	\N	2019-11-04 13:19:09.162+00	2019-11-04 13:19:09.162+00	\N
cc32c25c-010c-44fb-9660-310997333f6e	admin	\N	2019-11-11 13:09:17.81+00	2019-11-11 13:09:17.81+00	\N
5c1928eb-6594-4fd2-9287-9d82384aec2a	CEO	\N	2019-11-11 13:10:56.051+00	2019-11-11 13:10:56.051+00	\N
f31a3276-ec13-4083-90bb-6a0d899aa0cb	CEO	\N	2019-11-11 13:14:08.162+00	2019-11-11 13:14:08.162+00	\N
a4f1cae4-432f-4ab5-8a9a-599b781950e0	CEO	\N	2019-11-11 13:41:59.132+00	2019-11-11 13:41:59.132+00	\N
b29d6869-14ea-4d96-afa0-81a66d56a51a	CMO	\N	2019-11-11 13:42:13.868+00	2019-11-11 13:42:13.868+00	\N
569f29d2-30cb-4a38-b092-ffeb2d0b02ad	VP of Marketing	\N	2019-11-11 13:42:39.179+00	2019-11-11 13:42:39.179+00	\N
e0ebde4c-5083-4f10-8db4-5efb599d3c18	CRO	\N	2019-11-11 13:42:21.833+00	2019-11-11 13:42:21.833+00	\N
317b5f84-0ab8-4226-9098-f9ac9964d37c	admin	\N	2019-10-23 11:26:19.696+00	2019-10-23 11:26:19.696+00	\N
d2b11d3f-9d35-43cf-b232-84315c7109b4	CEO	L3	2019-09-24 05:14:02.574+00	2019-09-24 05:14:02.574+00	535d507a-e31e-48ea-9787-fa196453466b
dd6b6856-0ac9-4f74-95ea-ddaa73a8d6b3	admin	L3	2019-09-24 05:20:33.797+00	2019-09-24 05:20:33.797+00	535d507a-e31e-48ea-9787-fa196453466b
5d03af33-b7ae-49e1-8c41-2a84fd398bcc	admin	L1	2019-11-06 11:45:30.647+00	2019-11-06 11:45:30.647+00	80eb862f-5806-401e-837f-3026d2be72ac
6e44e331-3ed1-4032-9ddb-411d0cf04637	admin	L1	2019-11-29 12:05:07.615+00	2019-11-29 12:05:07.615+00	4ee3a6f8-18c0-495c-9ef4-ac6197dc7d23
a49075ca-a8ba-4435-bfb7-126bcb3060d7	head	L1	2019-11-29 12:45:10.955+00	2019-11-29 12:45:10.955+00	0f8afc69-0ca6-44ad-b2cc-d20f76484c2d
e699efdc-7331-4552-aeef-d5651e4d6c6d	head	L1	2019-11-29 12:48:01.396+00	2019-11-29 12:48:01.396+00	0f8afc69-0ca6-44ad-b2cc-d20f76484c2d
b8abc41c-41d1-42ff-b7eb-b4f75f6cb2b3	executive	L1	2019-11-29 12:48:17.697+00	2019-11-29 12:48:17.697+00	e7bf8b26-f2eb-4578-8e48-10e23f3282ae
1985e1b6-ac49-4d83-a4af-12e6558fdb6b	admin	L1	2019-12-06 05:15:07.72+00	2019-12-06 05:15:07.72+00	a5e45f0c-b511-4c64-884d-ac39338a45bb
2e1ce1c6-0238-4965-a521-8507bb2f53aa	Marketing Manager	L1	2019-12-06 05:58:53.436+00	2019-12-06 05:58:53.436+00	62be7e14-a171-44eb-b9ab-247280183fbc
648e8673-1578-4382-b95d-a8142d59c6d4	Marketing Executive	L1	2019-12-06 05:59:10.801+00	2019-12-06 05:59:10.801+00	62be7e14-a171-44eb-b9ab-247280183fbc
30e1d234-5db9-42dc-bef4-c6cb7b212cc1	admin	l1	2019-10-17 07:05:59.66+00	2019-10-17 07:05:59.66+00	\N
70d6b9d3-1603-4e48-83c2-7b9271a372bc	admin	l1	2019-11-04 06:10:55.92+00	2019-11-04 06:10:55.92+00	\N
62416816-3e4a-4519-a79e-7bb288844745	Head of Departement	l1	2019-11-04 06:12:31.995+00	2019-11-04 06:12:31.995+00	\N
dbae34e4-cb47-4065-9e3b-4d020773559a	Admin Executive	l1	2019-11-04 06:12:59.293+00	2019-11-04 06:12:59.293+00	\N
c2161321-dea3-4dad-9a2e-c61b5f703164	Sales Head	l1	2019-11-04 06:13:10.465+00	2019-11-04 06:13:10.465+00	\N
82e75375-de79-4157-821e-b9ca0baa5788	Sales Executive	l1	2019-11-04 06:13:23.354+00	2019-11-04 06:13:23.354+00	\N
102431a5-420b-4001-b437-bde57a13ea5a	HR Manager	l1	2019-11-04 06:13:33.726+00	2019-11-04 06:13:33.726+00	\N
176b3e63-f0ad-4f94-968e-b95addf89a37	HR Executive	l1	2019-11-04 06:13:43.554+00	2019-11-04 06:13:43.554+00	\N
da785617-d502-48d2-8a92-fb3e54dd839f	IT Head	l1	2019-11-04 06:13:53.584+00	2019-11-04 06:13:53.584+00	\N
b00b187b-eaf7-4c9b-93aa-44b332f6adbc	Engg	l1	2019-11-04 06:14:00.906+00	2019-11-04 06:14:00.906+00	\N
a6fc75ea-1fb3-4867-8c6c-e5ff02054609	SALESHEAD	L2	2019-09-24 05:13:34.81+00	2019-09-24 05:13:34.81+00	535d507a-e31e-48ea-9787-fa196453466b
103b6074-9702-444c-aa6e-ccebb83fce8a	super	L2	2019-09-25 07:46:23.863+00	2019-09-25 07:46:23.863+00	37307be3-a964-4c2d-a76c-a0faf600b330
8917202e-8969-4326-8fc8-96a0228c3e51	Team Lead	L3	2019-09-24 05:13:50.215+00	2019-09-24 05:13:50.215+00	535d507a-e31e-48ea-9787-fa196453466b
45cc28fe-ea2b-468f-a85a-a98b83fb28d1	admin	L1	2019-12-06 06:41:41.356+00	2019-12-06 06:41:41.356+00	030ce185-be1b-4736-87da-3bc0622f3fe5
bfb45b9f-1db2-44c9-8298-e1397702e635	Executive	L1	2019-12-06 07:23:18.103+00	2019-12-06 07:23:18.103+00	b2c7cf5f-8157-4055-9ba9-b0e3c34ba7f4
f1b0542e-a0fc-484f-af8a-4c3509ab5921	Head	L1	2019-12-06 07:23:25.453+00	2019-12-06 07:23:25.453+00	43dd502d-a2d6-4881-8362-8b6a142a5827
76cd7d9b-8081-4cd3-bff7-8edfaf60a00b	Tester	L1	2019-12-06 07:23:39.696+00	2019-12-06 07:23:39.696+00	ddd31cff-2ebb-43b9-9127-0f8cffd7627d
b72bed3b-439c-4c8a-bac1-a763fddfac91	Developer	L1	2019-12-06 07:29:12.473+00	2019-12-06 07:29:12.473+00	ddd31cff-2ebb-43b9-9127-0f8cffd7627d
c5c24efa-fcb0-4c0e-af06-cf0dc87122dd	mean	L1	2019-12-06 09:33:29.3+00	2019-12-06 09:33:29.3+00	5a838386-015b-471e-92fd-b5b7e98c7581
1377ffe2-7288-47b6-aa17-9f7b5e11c232	node	L1	2019-12-06 09:34:40.058+00	2019-12-06 09:34:40.058+00	5a838386-015b-471e-92fd-b5b7e98c7581
ddd553c6-046e-4293-a3fa-0741d3713cb2	temp	L1	2019-12-06 09:43:31.427+00	2019-12-06 09:43:31.427+00	30e28552-a7d3-4561-b33d-aac1562ddda9
a4d1671c-65d6-42d5-a08a-81c700c9ead4	new	L1	2019-12-06 09:43:54.122+00	2019-12-06 09:43:54.122+00	30e28552-a7d3-4561-b33d-aac1562ddda9
3b136223-6b18-4ca6-93f4-aace3d487f57	executive	L3	2020-01-21 06:56:18.517+00	2020-01-21 06:56:18.517+00	d2599893-4126-4b1d-aeab-300cf3b2615a
b864c17b-bfeb-42fc-9519-03daa96ae14d	TL	\N	2019-10-17 07:10:33.722+00	2019-10-17 07:10:33.722+00	\N
63309157-5b50-4ddd-aac2-b4e8cacfb3c9	Sales Head	\N	2019-11-05 04:58:35.442+00	2019-11-05 04:58:35.442+00	\N
dd300013-d321-41ea-b9ce-6221017ff465	admin	\N	2019-12-07 14:57:25.536+00	2019-12-07 14:57:25.536+00	\N
5d5b8d0e-9f16-481f-a285-896efa2cabd8	Director of Marketing	\N	2019-11-11 13:42:48.236+00	2019-11-11 13:42:48.236+00	\N
b9a986b9-97b1-400a-b054-90c70dd7b6b5	Marketing Manager	\N	2019-11-11 13:42:57.028+00	2019-11-11 13:42:57.028+00	\N
c4ce6a56-0b79-4488-bc05-f593cec8f245	Roasting Director	L2	2020-02-04 18:26:24.281+00	2020-03-30 17:10:01.058+00	4f8ba249-ec10-4233-9af9-a6bbd7ffc4bc
a46d5d7d-2813-4e6c-8842-89ea04ca094a	Program Director	L2	2020-02-04 18:26:00.355+00	2020-03-30 17:11:43.222+00	ffc5574c-7345-41cf-a728-69faced4d6f7
ad373c46-c30b-4897-bf1d-72ccb136d2b3	admin	\N	2019-12-06 10:58:15.21+00	2019-12-06 10:58:15.21+00	\N
c31c0e56-26e5-4b6e-a0dc-6888a71a947f	Coffee Managers	L2	2020-02-04 18:25:35.658+00	2020-03-30 18:09:57.627+00	b9403988-6e63-4591-819b-a16eae882aa5
c8f55b38-397c-4510-9b89-6f1d397681cb	sale Head	L3	2020-02-05 05:55:38.756+00	2020-03-09 14:07:23.123+00	dfd1c7a0-ce1e-450d-8ef0-483972d19251
17f26546-df4f-46e2-807e-e91ead33872c	Tech Head	L3	2020-02-05 06:58:31.444+00	2020-03-11 10:20:18.312+00	4516f207-b722-4e0b-8575-633df5701e48
d9f917af-3bdd-43b5-9911-f76ccbb7e50f	ghh	L3	2020-02-05 06:57:53.659+00	2020-03-11 10:20:23.896+00	4516f207-b722-4e0b-8575-633df5701e48
f90e2bce-0906-424e-8e94-2ff92d233e33	CEO	L1	2020-02-19 22:46:16.417+00	2020-03-12 17:55:41.404+00	385e5b21-971f-41b1-a6be-212c376553d9
ae313c51-8224-4dee-bbec-776600511d98	admin	L1	2020-02-05 12:23:08.759+00	2020-02-05 12:23:08.759+00	1b550287-30f9-4cb5-8588-ffdf72df657a
b43a9a26-9376-4202-8363-513029a1ee26	CEO	L1	2020-01-18 09:14:43.563+00	2020-03-12 07:54:37.937+00	\N
4ce95fc8-fb37-4bbb-be26-5ae9dd95cb5e	Sales Manager	L2	2020-01-18 10:33:50.071+00	2020-03-12 07:55:21.005+00	\N
4f2d29d7-f440-4e9c-be11-8ffde273484f	manager	L3	2020-02-06 07:00:30.741+00	2020-02-06 07:00:30.741+00	dad67b17-7771-47bc-9165-e860e756e882
2bddffff-4230-4547-99ce-35519ddccc00	admin	L1	2019-12-09 07:22:39.426+00	2019-12-09 07:22:39.426+00	0fc7c59c-c1ce-4d3b-ac4b-aaa0f477840e
2bae918e-ec9e-4235-b8b6-9a8bbb5aec5c	admin	L1	2020-01-07 13:12:48.571+00	2020-01-07 13:12:48.571+00	1d4b694c-f4ae-4830-9f34-0a9b5f257258
998a1e8b-3870-4edd-bf2d-33898487f27c	Executive Assistant	L3	2020-01-10 18:43:17.749+00	2020-01-10 18:43:17.749+00	0aba8835-1ad4-4359-b344-b27138b0b292
fee167d4-43c1-4fab-b8eb-edc9b6e907ae	admin	L1	2020-01-21 06:46:12.938+00	2020-01-21 06:46:12.938+00	b5d8e6db-2e70-42ef-bc25-837eddc6178a
eafdc07b-580c-43b5-80df-979ea2ac2dc8	admin	L1	2020-04-03 19:15:11.703+00	2020-04-03 19:15:11.703+00	\N
3b7f3a25-c65c-46ad-8174-3ac503267431	developer	L3	2020-01-21 06:55:57.458+00	2020-01-21 06:55:57.458+00	59e65de3-6772-40bc-bd5d-9bbdac9d984b
25ece8f7-3878-4725-b090-e0e0c3ce3318	Sales Executive	L3	2020-01-25 13:29:58.096+00	2020-03-12 07:55:33.245+00	\N
681bc7e4-b022-4f9f-8b34-79a0bdb21a0e	HR Manager	L2	2020-01-18 10:34:01.015+00	2020-03-12 07:54:20.07+00	\N
1951dd4d-f7c3-48c9-bd8d-e711557f7f1d	Technical Lead	L2	2020-01-30 11:14:11.856+00	2020-03-12 07:56:29.803+00	\N
5a3e8ca6-62d5-4f9b-9866-e69530c33131	Technical Engg	L3	2020-01-30 11:14:52.345+00	2020-03-12 07:56:47.026+00	\N
bc60c442-4afe-4502-bdf7-34da825b7216	Technical Head	L2	2020-01-18 10:34:09.17+00	2020-03-12 07:55:58.584+00	\N
9b64e98c-53db-4094-bd6f-18abb062ad59	Technical Executive	L3	2020-01-30 11:13:59.381+00	2020-03-12 07:56:12.047+00	\N
ec9cbc23-59b8-443c-b602-248d8f356f57	tester	L3	2020-01-21 06:56:04.405+00	2020-01-21 06:56:04.405+00	59e65de3-6772-40bc-bd5d-9bbdac9d984b
d86b7d60-afac-4c4b-bcb7-29e33288d213	head	L3	2020-01-21 06:56:28.023+00	2020-01-21 06:56:28.023+00	6721dd73-9372-4f14-922e-2ab6a62b229f
08b4fb3b-78e5-427c-91ab-1f0f86a36dd3	manager	L3	2020-01-21 06:56:42.865+00	2020-01-21 06:56:42.865+00	8a3fa5eb-e3be-49d4-9316-e488b4093c2e
633a757f-a25c-460c-bb4b-13dc1877e149	Team Lead	L3	2020-01-21 07:22:16.026+00	2020-01-21 07:22:16.026+00	b05eab41-a422-42df-9d7f-9779deef26ae
2e6bd6c5-c462-452d-823e-690d41504032	admin	L1	2020-02-04 18:13:26.538+00	2020-02-04 18:13:26.538+00	7a9fcdde-14c9-450f-b33c-eb2a16fc8bc4
f80665ce-96a7-483e-b9d5-18a02be3a97b	CEO	L3	2020-02-04 18:24:53.912+00	2020-02-04 18:24:53.912+00	7a9fcdde-14c9-450f-b33c-eb2a16fc8bc4
eda19ca9-53c2-4615-973d-5f339e6470e0	Advisor	L3	2020-02-04 18:26:53.842+00	2020-02-04 18:26:53.842+00	24af4bcd-a8ee-4c4a-9ec3-ea616a9f1d4b
ef2c19ae-daec-4443-944a-09bf03d71099	Bookkeeper	L3	2020-02-04 18:27:29.349+00	2020-02-04 18:27:29.349+00	d91bd1ab-e028-4932-903a-c6691d9f8fbb
cb9e9606-9536-4443-9ee4-3a1e9e17f711	tech head	L3	2020-02-05 06:59:03.148+00	2020-02-05 06:59:03.148+00	b89e5582-8a3f-4b3d-afa9-bc4da0f966a8
fc271cca-0144-41cd-b888-c7a8358469e1	tester	L3	2020-02-06 07:00:41.16+00	2020-02-06 07:00:41.16+00	53e32ae5-7b61-4d95-8cd5-99ee0a5daa5a
6136f6ce-7472-4dcf-9ed4-864c1a7c09c3	developer	L3	2020-02-06 07:00:54.055+00	2020-02-06 07:00:54.055+00	12180e49-075b-4e9d-9890-2c15c7251821
314d90de-02b5-40b0-8794-e5fd769d208f	support head	L3	2020-02-07 06:22:13.967+00	2020-02-07 06:22:13.967+00	b89e5582-8a3f-4b3d-afa9-bc4da0f966a8
568e700e-248a-4dc0-8669-f467b26ee0ea	supports_head	L3	2020-02-07 06:22:56.415+00	2020-02-07 06:22:56.415+00	82477a99-20ca-46b9-8b9a-a4d4fc246160
31e6b8bf-1df7-4fb8-84e5-1af40b157ffd	admin	L1	2020-02-04 18:16:53.658+00	2020-02-04 18:16:53.658+00	\N
13a2a91f-8fd1-411b-9ba8-249d7ed1206b	admin	L1	2020-02-10 19:43:40.782+00	2020-02-10 19:43:40.782+00	de7501fd-ec06-4b2b-a922-4810ecdc42f1
fab9168f-5a8d-40b4-ae3c-6005a05507e1	admin	L1	2020-02-04 18:17:27.865+00	2020-02-04 18:17:27.865+00	\N
12a5a827-3e22-4799-aeb9-725b6740999e	admin	L1	2020-02-19 18:12:39.323+00	2020-02-19 18:12:39.323+00	385e5b21-971f-41b1-a6be-212c376553d9
2c6ea2a9-8c58-446d-960e-6295924f8495	Head3	L1	2019-12-09 07:45:24.889+00	2019-12-09 07:49:01.175+00	0fc7c59c-c1ce-4d3b-ac4b-aaa0f477840e
0abc1d25-f868-4e5b-828f-56052e1fc842	Executive Assistant	L2	2020-02-19 22:47:21.406+00	2020-03-16 21:31:02.935+00	385e5b21-971f-41b1-a6be-212c376553d9
fd44aa54-bd07-49d4-a646-3e3f57121204	admin	L1	2020-02-02 20:41:38.432+00	2020-02-02 20:41:38.432+00	\N
0fbd4b6d-0d74-4a6f-a7dc-d90429ff454f	VP o Sales	L1	2019-11-15 22:00:16.168+00	2019-11-15 22:00:16.168+00	601be882-83c2-452a-9c37-95796bb10284
77bdc679-9fb7-4345-9ec4-be5fc2c98705	CMO	L1	2019-11-15 22:00:31.818+00	2019-11-15 22:00:31.818+00	3ec925c3-9231-4f63-b413-138e40903a0c
d85d51b9-8add-413e-b1a2-4d17d0838a9d	VP	L1	2019-11-15 22:24:38.718+00	2019-11-15 22:24:38.718+00	3ec925c3-9231-4f63-b413-138e40903a0c
a42c344c-8e98-42f1-89b8-721fac7587f0	Assistant	L3	2019-11-06 14:38:54.213+00	2020-03-09 14:07:05.627+00	dfd1c7a0-ce1e-450d-8ef0-483972d19251
97dd2c13-72a3-4537-8ba6-83cb00779d28	Sales Head1	L1	2019-11-06 11:46:26.888+00	2020-03-09 14:07:17.134+00	dfd1c7a0-ce1e-450d-8ef0-483972d19251
3cd4d755-1782-4c5d-994f-ea2c33d55ccc	new head	L2	2020-03-05 09:41:21.539+00	2020-03-11 10:07:34.256+00	b89e5582-8a3f-4b3d-afa9-bc4da0f966a8
f7c3923f-4a78-4b35-a148-2e022ec86d5f	Vice President	L1	2019-11-06 14:39:32.005+00	2020-03-11 10:20:13.025+00	4516f207-b722-4e0b-8575-633df5701e48
f9103815-178f-4960-8dc2-4b2d2edfc349	New H	L3	2020-03-05 09:22:51.659+00	2020-03-11 10:20:39.263+00	2fa95b37-86ff-467f-acca-b8730e16b2d8
ab175732-a6e0-4051-a66a-0d4c66955589	Tech Lead	L1	2019-12-10 12:55:08.195+00	2020-03-11 10:20:45+00	2fa95b37-86ff-467f-acca-b8730e16b2d8
fd1bea06-67b1-45f4-85ed-641a6b08762c	Head	L2	2019-12-10 12:54:45.094+00	2020-03-11 10:20:54.736+00	2fa95b37-86ff-467f-acca-b8730e16b2d8
d7da24d6-2476-4065-9596-662a99971a1b	head	L3	2020-03-05 09:27:20.256+00	2020-03-11 10:21:03.28+00	379fa685-a028-4515-afda-aa670893f942
f2c386e6-cc4b-462f-b0f6-a1ee28f45995	Admin Manager	L2	2020-03-12 07:54:51.238+00	2020-03-12 07:54:51.238+00	\N
37c395b6-f890-401f-b8cf-7eee92c09970	Admin Executive	L3	2020-03-12 07:55:04.435+00	2020-03-12 07:55:04.435+00	\N
1ad575af-9c58-47f1-9b13-309fd2a95252	HR Executive	L3	2020-03-12 07:54:06.055+00	2020-03-12 07:54:06.055+00	\N
9d47d600-be0a-436d-9f4d-e37ff39298d8	Admin Manager	L2	2020-03-12 13:41:04.67+00	2020-03-12 13:41:04.67+00	eaa92399-f5d8-4bcc-870d-2a4a1eec5d1c
b9dba0a5-cc92-4027-98f4-199b7fc46232	CEO	L1	2020-03-12 13:36:38.104+00	2020-03-12 13:41:33.573+00	eaa92399-f5d8-4bcc-870d-2a4a1eec5d1c
78372f40-6c07-4a41-8c53-871b81b73ab9	Admin Executive	L3	2020-03-12 13:41:58.27+00	2020-03-12 13:41:58.27+00	eaa92399-f5d8-4bcc-870d-2a4a1eec5d1c
192a99d1-4785-41a3-8dbb-b3bab1645eef	HR Manager	L2	2020-03-12 13:42:14.354+00	2020-03-12 13:42:14.354+00	4a58c1b1-db3f-4e3a-a523-2095e0fac60d
f8edc05e-9509-4264-a3df-bc4d3bc8e328	HR Executive 	L3	2020-03-12 13:42:51.039+00	2020-03-12 13:42:51.039+00	4a58c1b1-db3f-4e3a-a523-2095e0fac60d
a73445f6-8faf-4998-a0d2-4d4d667dacaf	Sale Head East	L2	2020-03-12 13:43:11.097+00	2020-03-12 13:43:11.097+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
55f5c377-87ed-4761-a867-947879953310	Sales Head West	L2	2020-03-12 13:43:22.612+00	2020-03-12 13:43:22.612+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
5cb4f49a-ae67-4ddc-964f-b0021f5019a0	Sales Head North	L2	2020-03-12 13:43:33.878+00	2020-03-12 13:43:33.878+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
b40fd733-5ef2-4cd5-9bbf-c195b46e9284	Sales Head South	L2	2020-03-12 13:43:49.541+00	2020-03-12 13:43:49.541+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
e2bd4af4-b978-4607-9b0a-d7cae771f4fd	Chief Revenue Officer	L2	2020-02-19 22:48:14.237+00	2020-03-16 21:30:38.007+00	ea9eca96-9a9d-48a9-9350-ccd0ba6c8201
15e4c89a-1fc0-4eb6-8563-7aeeae1c1d37	admin	L1	2020-03-06 13:57:15.777+00	2020-03-06 13:57:15.777+00	\N
d8d918b9-ae3b-4078-8b25-646b9dc8ba49	CMO	L1	2019-11-15 22:24:47.207+00	2019-11-15 22:24:47.207+00	601be882-83c2-452a-9c37-95796bb10284
0c68c3db-9eb3-4453-a7bc-a0806aa12efa	admin	L1	2020-03-06 13:53:09.773+00	2020-03-06 13:53:09.773+00	c1320795-729c-43c4-b9f7-e753427e989b
11a76579-e5de-4fe7-be25-aeec9c22151f	admin	L1	2020-03-06 13:54:37.361+00	2020-03-06 13:54:37.361+00	02c37f89-d11a-4a65-8264-8bfc15cb060f
aa480497-931e-4ee6-a493-14c568921627	admin	L1	2020-03-06 13:56:02.993+00	2020-03-06 13:56:02.993+00	39ea4177-ecd9-44e5-8529-2e9a768eb771
8e7a0ee0-7add-4a22-876f-686f7bd7c75c	admin	L1	2020-03-06 13:58:13.267+00	2020-03-06 13:58:13.267+00	86a02d20-5471-4780-ac69-cfafb542a9d5
02243e7d-f4fa-48f7-bc1b-2e7a44f7022c	admin	L1	2020-03-06 13:53:58.749+00	2020-03-06 13:53:58.749+00	\N
b85c9c09-7d68-4668-ad88-c2c1882565c8	Chief Financial Officer	L2	2020-02-19 22:47:39.583+00	2020-03-16 21:29:27.318+00	ec5eede5-74a6-48c7-af3c-8e9618ec9151
f539a6cc-b64d-45b1-874a-4a9823072c08	admin	L1	2020-03-06 13:55:13.403+00	2020-03-06 13:55:13.403+00	\N
f90c4ba6-dd6c-4e21-bfc8-11b3d0cde611	Level Four Tester	L3	2020-03-09 15:30:34.644+00	2020-03-09 15:30:34.644+00	\N
1a35ae30-5197-47f6-9eaf-a5e813fe5578	Level Five Tester	L3	2020-03-09 15:30:51.053+00	2020-03-09 15:30:51.053+00	\N
9a167004-a4ef-4fb5-8504-d4b4669b9cce	Level Two Tester	L3	2020-03-09 15:27:52.119+00	2020-03-09 15:27:52.119+00	\N
56668579-2a24-44c0-94ac-2af47e5dfeb9	Level Three Tester	L3	2020-03-09 15:28:09.513+00	2020-03-09 15:28:09.513+00	\N
462a7163-3fab-4bac-be72-e30b54594661	Level One Tester	L3	2020-03-09 15:27:34.316+00	2020-03-09 15:27:34.316+00	\N
e5f7931e-5b95-4399-a86a-42527e26bd0c	Sales Executive East	L3	2020-03-12 13:44:08.711+00	2020-03-12 13:44:08.711+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
addac93e-491c-4da1-8f23-3b0d68ada7e4	Sales Executive West	L3	2020-03-12 13:44:25.38+00	2020-03-12 13:44:25.38+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
6db00128-8efe-4ac4-b099-1c3b7108ba95	Sales Executive North	L3	2020-03-12 13:44:36.132+00	2020-03-12 13:44:36.132+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
42c9ce6e-7eaa-44c6-98ad-291309870cc3	Sales Executive South	L3	2020-03-12 13:44:45.365+00	2020-03-12 13:44:45.365+00	cf553ced-3627-46eb-98c4-c92cb96c67f1
1aa0ed49-be09-4f31-ae30-b9fdb4c414e2	Technical Manager	L2	2020-03-12 13:45:28.441+00	2020-03-12 13:45:28.441+00	065c58d5-2a24-4572-a70f-9be927928948
8aa21d91-b11a-4c57-855e-b2730095f977	Technical Head	L2	2020-03-12 13:45:39.983+00	2020-03-12 13:45:39.983+00	065c58d5-2a24-4572-a70f-9be927928948
899790bf-36f2-4666-9395-94c97eec3ef4	Technical Lead	L3	2020-03-12 13:45:57.2+00	2020-03-12 13:45:57.2+00	065c58d5-2a24-4572-a70f-9be927928948
46c04f41-c6be-4533-b79a-fe587fdbaf43	Android Developer	L4	2020-03-12 13:46:42.857+00	2020-03-12 13:47:09.218+00	065c58d5-2a24-4572-a70f-9be927928948
5676e1ed-bcf5-4680-932c-3fe703c32837	PHP Developer	L4	2020-03-12 13:47:23.649+00	2020-03-12 13:47:23.649+00	065c58d5-2a24-4572-a70f-9be927928948
dadcd6cb-3a1d-41e5-ae74-a8645fa083c7	Dot Net Developer	L4	2020-03-12 13:47:34.835+00	2020-03-12 13:47:34.835+00	065c58d5-2a24-4572-a70f-9be927928948
3992329c-dcdb-46fb-9f4f-8e50404508e9	admin	L1	2020-02-26 19:22:30.754+00	2020-02-26 19:22:30.754+00	a53798b4-035d-4304-9a39-bfa1240a7eda
aaca8b70-427f-4310-858c-4eb367db2283	President	L3	2020-02-26 20:16:37.215+00	2020-02-26 20:16:37.215+00	2f56e3d7-dd69-46f9-8515-f5755bdeabf6
ee8f930a-426b-4b3e-b0f5-5fea7bc7e78a	admin	L1	2020-02-27 18:18:13.375+00	2020-02-27 18:18:13.375+00	7c510ee5-2ce1-4299-a01d-9968da22514f
9d586d41-07c5-41b0-ba68-95eb0511a43f	admin	L1	2020-03-03 15:03:18.317+00	2020-03-03 15:03:18.317+00	\N
f0bf8bc3-f478-44a1-bffd-f57958c35de8	admin	L1	2020-03-03 15:50:08.647+00	2020-03-03 15:50:08.647+00	\N
c9f2b3b8-f593-4b4f-93bd-18198a6a9baa	admin	L1	2020-03-03 15:51:47.044+00	2020-03-03 15:51:47.044+00	\N
764375c2-d46d-4f53-83c8-b492def306f0	admin	L1	2019-12-13 21:18:07.718+00	2019-12-13 21:18:07.718+00	a2a56f37-30d4-4a39-a3ca-34ea22e5d886
e07de7e7-eb03-4588-872d-2909adb33ee4	admin	L1	2019-12-31 16:12:02.388+00	2019-12-31 16:12:02.388+00	d35e0f4b-e95d-4c96-ad2b-8f0fc32b8435
715225ae-41c6-4992-8921-8c39fb92b9f3	admin	L1	2019-12-31 16:52:05.503+00	2019-12-31 16:52:05.503+00	9eac9e51-921e-4121-a8bc-a95954c7e334
35bbe994-1949-437d-8c1a-88f416d1b169	VP of Marketing	L1	2019-12-31 16:55:22.914+00	2019-12-31 16:55:22.914+00	b20a3c62-459b-49ed-83c4-78ca61c25827
6f999f39-383f-4af9-87e2-7ce83c6bc297	VP of Sales	L1	2019-12-31 16:55:35.672+00	2019-12-31 16:55:35.672+00	3dfb3d99-9e81-4e2f-b405-a12cc25f8e29
aaae2108-4d52-436d-8f1b-cfd385ae4a69	Director of North American Sales	L1	2019-12-31 16:55:50.388+00	2019-12-31 16:55:50.388+00	3dfb3d99-9e81-4e2f-b405-a12cc25f8e29
0a5abd8b-6210-401b-9546-4af3f2691602	Director of EMEA Sales	L1	2019-12-31 16:56:06.118+00	2019-12-31 16:56:06.118+00	3dfb3d99-9e81-4e2f-b405-a12cc25f8e29
bbe63eab-d9e1-4e0c-ae98-642e23b55a58	admin	L1	2020-01-01 08:34:45.552+00	2020-01-01 08:34:45.552+00	4b0b9ab3-87d4-4f05-8aad-4ab43e3e6dff
bdfadadf-ee09-4a44-baec-435c00e0231f	admin	L1	2020-01-01 08:41:42.733+00	2020-01-01 08:41:42.733+00	8dbd085f-0d38-4cae-9d9d-de63bc5749f8
6e238eb1-91b1-43bd-89d5-be2f4507cc68	admin	L1	2019-11-15 21:57:32.454+00	2019-11-15 21:57:32.454+00	0aba8835-1ad4-4359-b344-b27138b0b292
4a4a0ef9-848e-4440-bba5-6ce1fa2cc276	CEO	L1	2019-11-15 21:59:45.606+00	2019-11-15 21:59:45.606+00	b764ec85-a234-4c80-a286-cc33c3a388d7
285ac483-1034-4c91-a2d6-5659d140263b	VP	L1	2019-11-15 21:59:57.382+00	2019-11-15 21:59:57.382+00	3ec925c3-9231-4f63-b413-138e40903a0c
75be138e-d588-4c93-be83-f05624310a00	Head	L4	2020-03-13 14:04:07.611+00	2020-03-13 14:04:07.611+00	b89e5582-8a3f-4b3d-afa9-bc4da0f966a8
a4d4b008-ad0e-443c-a43f-466465cafac2	Chief Financial Officer	L1	2020-03-16 15:43:12.157+00	2020-03-16 15:43:12.157+00	db90330e-bdfd-455b-81ae-557b5adb2105
233c9de1-0d53-4830-a7f2-d583633b3708	Director of Finance	L3	2020-04-01 16:05:23.747+00	2020-04-01 16:05:23.747+00	ec5eede5-74a6-48c7-af3c-8e9618ec9151
c7bc9456-ae64-4fb7-8f71-416712cedd4a	Chief Customer Experience Officer	L2	2020-02-19 22:47:57.671+00	2020-03-16 21:29:55.86+00	6de2b90a-204a-4621-9c32-9944f4735ac1
2b0fc6eb-ae7f-4825-9e03-51e368d73b54	Sr. Director of Customer Experience	L2	2020-02-29 19:12:51.715+00	2020-03-16 21:30:00.625+00	6de2b90a-204a-4621-9c32-9944f4735ac1
a7110712-864c-4077-b04c-fcebb5e8a0da	Engineer	L2	2020-02-29 19:36:22.131+00	2020-03-16 21:31:45.536+00	11bd4b4c-9c6e-4616-b4b6-15abac305a7d
33ebaf0c-b622-4204-b042-5214cb54cee4	Executive Coach Consultant	L2	2020-03-20 14:34:50.428+00	2020-03-20 14:34:50.428+00	385e5b21-971f-41b1-a6be-212c376553d9
59773de2-26c7-4503-9fb7-d6f28031cab1	Business Coach Consultant	L2	2020-03-20 14:35:40.217+00	2020-03-20 14:35:40.217+00	29944728-6a21-45cb-8344-f5add03e69f5
f0a0723b-2a47-4ace-be82-e3b87aa54b56	admin	L1	2020-03-03 14:53:49.444+00	2020-03-03 14:53:49.444+00	\N
796fc294-5e9f-4dad-b35b-6fa4937d1b7e	Lead Adult	L3	2020-03-30 17:55:54.81+00	2020-03-30 17:55:54.81+00	4f8ba249-ec10-4233-9af9-a6bbd7ffc4bc
ad77ea50-3501-40ec-94fd-da48c56519ad	Director of Operations	L2	2020-03-31 17:41:41.88+00	2020-03-31 17:41:41.88+00	54ae61a3-cc04-4ee9-a3a2-dbd8a62b32fa
fce53a2d-3f2b-4529-baab-c3a1a80cda48	President	L2	2020-04-06 13:56:39.275+00	2020-04-06 13:56:39.275+00	4b0171e2-6bae-4aee-8747-02c2b6c3571e
0615c54f-8210-4598-858a-ad113a33b33c	Chief Operating Officer	L2	2020-04-06 14:32:51.528+00	2020-04-06 14:32:51.528+00	7710237f-9baf-42fc-9c0f-144eec9f3127
00fab334-279e-434c-956e-5797f84c2a89	President	L2	2020-04-07 12:29:35.14+00	2020-04-07 14:52:13.941+00	414017fd-cf7f-4ee8-9510-a2a3e1143d08
0d17c1dd-2731-4af0-b83d-ce7e8bb3a374	Vice President of Operations	L2	2020-04-07 19:48:06.204+00	2020-04-07 19:48:06.204+00	0efde6b6-bf44-4536-9b9a-93bedf5988db
df135241-2e82-4803-baf4-d41a8e2d0fe8	admin	L1	2020-03-31 20:35:56.863+00	2020-03-31 20:35:56.863+00	50a0231a-ca3e-48f2-81eb-00c3b5560136
bb233817-fd9c-4ccd-9103-479302c2f1d7	admin	L1	2020-03-23 20:07:22.307+00	2020-03-23 20:07:22.307+00	\N
093fa12d-97be-4865-9cbd-395da59f63c1	Vice President of Marketing	L2	2020-04-07 19:48:22.023+00	2020-04-07 19:48:22.023+00	37b7054c-32e8-4955-afaa-595411391a35
7e96087d-1a5e-4512-a6a5-f5b63e272d79	Vice President of Sales	L2	2020-04-07 19:48:43.781+00	2020-04-07 19:48:43.781+00	e8d53017-8805-4c72-a39b-d55762727008
69f1456b-d01d-4ba4-b66e-a2b7bff40cc8	Director of Marketing	L3	2020-04-07 19:49:08.016+00	2020-04-07 19:49:08.016+00	37b7054c-32e8-4955-afaa-595411391a35
4df8e98f-842c-4ee7-a1e2-bbab176bc609	Copy Writer	L2	2020-04-10 16:51:36.176+00	2020-04-10 16:51:36.176+00	2ff151ca-21c8-432f-b86f-73b77eb2e49a
2c97407a-2fa0-4d5d-a6ac-15e91d98ac6e	Vice President of Operations	L2	2020-04-07 12:33:50.29+00	2020-04-10 17:38:40.37+00	e0f2700e-a437-4cf0-9c4c-5f2da3f75567
0f1e0338-402b-475e-8bb3-898fe6593d78	admin	L1	2020-04-02 20:05:46.154+00	2020-04-02 20:05:46.154+00	60212bba-9fc2-498a-a2a8-ffdf44a5c54d
e61e62b8-4433-4f40-83fd-06afdac00777	admin	L1	2020-03-23 20:07:59.479+00	2020-03-23 20:07:59.479+00	\N
131e4505-bc82-4462-a6f1-54f8d8e51425	admin	L1	2020-03-23 20:17:10.854+00	2020-03-23 20:17:10.854+00	be3ec8fd-6e7a-4c34-810c-750a0f97a542
42d94d1d-3c96-4e2c-a9fc-64a844878411	admin	L1	2020-03-24 18:46:49.702+00	2020-03-24 18:46:49.702+00	72c2fd4e-4571-46c5-9b28-2764c5604604
0c0e005c-658b-4686-8131-54fb63c2d883	admin	L1	2020-03-30 16:01:45.69+00	2020-03-30 16:01:45.69+00	\N
dcce0cb2-628c-4549-a71f-9e801f002492	admin	L1	2020-03-16 14:36:34.222+00	2020-03-16 14:36:34.222+00	\N
b8a8a638-90bc-40b3-9289-5e7ae357f5ca	admin	L1	2020-04-03 21:00:11.028+00	2020-04-03 21:00:11.028+00	3d9b964a-4c2a-4096-9e40-fd403a06f5cc
fe77dd77-f180-4dd6-9776-706973df0ed9	admin	L1	2020-04-03 21:02:10.827+00	2020-04-03 21:02:10.827+00	e0f2700e-a437-4cf0-9c4c-5f2da3f75567
91721220-d17a-41c8-b10a-5682849b0bf5	admin	L1	2020-04-06 05:10:59.052+00	2020-04-06 05:10:59.052+00	f28629d2-7570-407e-9009-2e10b5bb70a7
2d4eb356-e7c6-44ce-a5f6-c3463dfe8345	admin	L1	2020-04-06 12:54:14.967+00	2020-04-06 12:54:14.967+00	414017fd-cf7f-4ee8-9510-a2a3e1143d08
4245a1f0-727d-49eb-a63f-7d138bd71617	admin	L1	2020-04-07 13:03:07.56+00	2020-04-07 13:03:07.56+00	c1bc44a9-603d-4777-a269-8666f5df79e3
afa93169-84a9-45fb-a26a-230b8414e995	admin	L1	2020-04-07 19:43:41.102+00	2020-04-07 19:43:41.102+00	e87b8084-ff82-4983-9ea1-43c88cce7e65
548f94f0-88d1-4fbd-bb49-b3322db43cef	admin	L1	2020-04-07 19:44:31.496+00	2020-04-07 19:44:31.496+00	826f7670-40a2-4be6-9f5b-79d5aa1a7f90
be7671a3-f706-4b4c-947c-2f02aaaf7be8	admin	L1	2020-04-09 17:43:48.048+00	2020-04-09 17:43:48.048+00	8326f405-bf95-4ab5-98e1-818dd102be19
a63d44bd-54a0-4a02-bc0e-1ffb7279db37	Director of Mentorship	L2	2020-04-13 18:39:28.447+00	2020-04-13 18:39:28.447+00	d0a68ce8-224d-44de-8261-2d997df5f430
baf50fee-f629-4b3c-ad63-b4eb39ef1ec3	CFO	L2	2020-04-16 14:26:59.137+00	2020-04-16 14:26:59.137+00	db90330e-bdfd-455b-81ae-557b5adb2105
ed185d91-9d3a-49b8-9f11-5bf0da232b3f	CFO	L2	2020-04-17 20:56:30.06+00	2020-04-17 20:56:30.06+00	8d9f641f-8813-4c3e-9326-b12f717b32f1
\.


--
-- Data for Name: section; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY section ("sectionID", "sectionName", "createdAt", "updatedAt", "driverID") FROM stdin;
\.


--
-- Data for Name: sectioncompleted; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY sectioncompleted ("sectioncompletedID", "isCompleted", "createdAt", "updatedAt", "sectionID", "uID") FROM stdin;
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY settings ("settingID", "dateTrigger", "createdAt", "updatedAt") FROM stdin;
dfa9a983-c88c-48c6-a1bf-2b3554c2b24e	2020-03-18 00:00:00+00	2020-03-18 13:58:36.043+00	2020-03-18 13:58:36.043+00
038b1d1b-3ea8-4ab9-a77d-baf83b5eeb49	2020-03-19 00:00:00+00	2020-03-19 07:55:37.701+00	2020-03-19 07:55:37.701+00
8fdb7476-85fd-46a8-aa9a-d53357dd4015	2020-03-20 00:00:00+00	2020-03-20 14:07:35.978+00	2020-03-20 14:07:35.978+00
c22dfffa-5e79-4f80-9da2-28d2ad035045	2020-03-22 00:00:00+00	2020-03-22 23:34:37.117+00	2020-03-22 23:34:37.117+00
918a4528-6776-4c06-bcae-d6cc9b531c65	2020-03-23 00:00:00+00	2020-03-23 03:35:02.445+00	2020-03-23 03:35:02.445+00
dc27cfb3-1350-4dc1-b7f2-0a15e46da26b	2020-03-24 00:00:00+00	2020-03-24 00:17:35.748+00	2020-03-24 00:17:35.748+00
bc13e259-4379-4b86-b25f-225aef591cd7	2020-03-25 00:00:00+00	2020-03-25 05:07:34.035+00	2020-03-25 05:07:34.035+00
933e4bd0-79a0-4b16-afad-d78c9fd97cdf	2020-03-26 00:00:00+00	2020-03-26 01:37:01.779+00	2020-03-26 01:37:01.779+00
102af2d4-9404-4b1d-bda9-92aea259d5bb	2020-03-27 00:00:00+00	2020-03-27 05:21:41.775+00	2020-03-27 05:21:41.775+00
d2ec8773-8347-4e16-94df-8bdf32cf5a9b	2020-03-28 00:00:00+00	2020-03-28 17:54:16.568+00	2020-03-28 17:54:16.568+00
4426f65b-a293-4732-9c0c-64368458c00a	2020-03-30 00:00:00+00	2020-03-30 13:06:27.512+00	2020-03-30 13:06:27.512+00
8c41bdc1-05d8-4ef9-8da5-078433948415	2020-03-31 00:00:00+00	2020-03-31 05:33:30.057+00	2020-03-31 05:33:30.057+00
46f6090e-d8ca-4862-b5d0-fc921466fc41	2020-04-01 00:00:00+00	2020-04-01 13:03:14.77+00	2020-04-01 13:03:14.77+00
eb4641be-eadc-447a-ac06-9b0549db7a1c	2020-04-02 00:00:00+00	2020-04-02 03:04:12.599+00	2020-04-02 03:04:12.599+00
d79894dd-b410-49b2-815e-afccc5dc5043	2020-04-03 00:00:00+00	2020-04-03 12:58:06.063+00	2020-04-03 12:58:06.063+00
76984230-a5f4-437b-933d-986dcd451218	2020-04-05 00:00:00+00	2020-04-05 19:19:52.725+00	2020-04-05 19:19:52.725+00
0861ff59-813e-441f-9c1c-92693aff9bf4	2020-04-06 00:00:00+00	2020-04-06 05:07:53.929+00	2020-04-06 05:07:53.929+00
72f11cd0-8a7f-4588-a8d6-fdd2bb599585	2020-04-07 00:00:00+00	2020-04-07 04:34:33.457+00	2020-04-07 04:34:33.457+00
63ac6e1c-5f34-4f49-b0a3-948e1f39493f	2020-04-08 00:00:00+00	2020-04-08 00:55:35.42+00	2020-04-08 00:55:35.42+00
615c6aee-0341-404d-836c-26b758e33351	2020-04-09 00:00:00+00	2020-04-09 05:22:35.192+00	2020-04-09 05:22:35.192+00
6d63499b-9cc4-4e37-8abb-37563f406457	2020-04-10 00:00:00+00	2020-04-10 04:21:23.953+00	2020-04-10 04:21:23.953+00
caff91cf-31d5-4e0d-8af7-893c036b65f1	2020-04-11 00:00:00+00	2020-04-11 04:41:48.971+00	2020-04-11 04:41:48.971+00
66c2fac0-4100-4c84-aa5c-471af065ce0b	2020-04-12 00:00:00+00	2020-04-12 04:51:52.297+00	2020-04-12 04:51:52.297+00
3d34eef5-a5cf-4730-a7e8-4a0a251f45d0	2020-04-13 00:00:00+00	2020-04-13 05:50:53.801+00	2020-04-13 05:50:53.801+00
99354e04-c316-44a4-9092-3dd7fb0c27d7	2020-04-14 00:00:00+00	2020-04-14 04:58:32.296+00	2020-04-14 04:58:32.296+00
eb1c929a-29c7-40d5-b795-1af0d420cb46	2020-04-15 00:00:00+00	2020-04-15 03:53:23.722+00	2020-04-15 03:53:23.722+00
c1ead59b-8a87-4b5b-8cd3-c675f28ff3bc	2020-04-16 00:00:00+00	2020-04-16 05:10:45.773+00	2020-04-16 05:10:45.773+00
73cacdee-b2c3-40fa-81d3-ba635171b17d	2020-04-17 00:00:00+00	2020-04-17 03:37:18.222+00	2020-04-17 03:37:18.222+00
50b31010-12d4-4a24-abf2-83b282d97925	2020-04-18 00:00:00+00	2020-04-18 12:50:43.976+00	2020-04-18 12:50:43.976+00
2b1374ff-237c-4cd8-8474-add1d6048281	2020-04-21 00:00:00+00	2020-04-21 04:26:01.511+00	2020-04-21 04:26:01.511+00
f8661379-8088-4ac7-b9dc-bb1508b0d8a1	2020-04-21 11:12:50.518+00	2020-04-21 11:12:50.52+00	2020-04-21 11:12:50.52+00
4777e8b5-3d26-4ab1-b37d-f3b617415745	2020-04-21 11:13:00.125+00	2020-04-21 11:13:00.126+00	2020-04-21 11:13:00.126+00
e48539bc-8833-435b-ae61-45e4c89b4aa2	2020-04-21 12:08:27.859+00	2020-04-21 12:08:27.864+00	2020-04-21 12:08:27.864+00
380e350a-380b-44a7-abf8-b47e2d5770de	2020-04-21 14:15:16.296+00	2020-04-21 14:15:16.302+00	2020-04-21 14:15:16.302+00
e1fe5696-5b31-4227-9a0e-1d0d45303363	2020-04-21 17:12:04.297+00	2020-04-21 17:12:04.298+00	2020-04-21 17:12:04.298+00
cf997f8c-391c-4d69-b738-976d27df1cff	2020-04-21 17:12:25.063+00	2020-04-21 17:12:25.064+00	2020-04-21 17:12:25.064+00
dde4f152-5526-45f1-a027-2b9ffb18b671	2020-04-21 18:11:45.978+00	2020-04-21 18:11:45.979+00	2020-04-21 18:11:45.979+00
ccc59b2d-5278-4531-b979-9f25623965d5	2020-04-22 04:44:20.399+00	2020-04-22 04:44:20.399+00	2020-04-22 04:44:20.399+00
e7eaafdd-adaf-4205-9fee-5a6874d681ef	2020-04-22 04:46:56.802+00	2020-04-22 04:46:56.802+00	2020-04-22 04:46:56.802+00
99e872ff-ca05-47b2-a8df-0795b72b0f32	2020-04-22 04:47:54.012+00	2020-04-22 04:47:54.012+00	2020-04-22 04:47:54.012+00
\.


--
-- Data for Name: useranswer; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY useranswer ("uanswID", answer, "rfpqID", "isActive", "createdAt", "updatedAt", "uID", "queID", "optionID", "driverID") FROM stdin;
\.


--
-- Data for Name: useroutcome; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY useroutcome ("uoID", statement, "createdAt", "updatedAt", "uID") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: catipult_cati
--

COPY users ("uID", name, lname, email, password, statement, "resetCode", info, "roleAdmin", "createdAt", "updatedAt", "rID") FROM stdin;
0013ee77-086b-4a19-abeb-319f81340e27	Mahesh	Ramanathan	mahesh.r@akoninfotech.com	$2a$10$Lg77DXszeJTN5webkB7SX.bW1rUFZzD73WenwUdlihUptk5k9FrFu	wr wertwert wrt wrt twert wer	0	\N	0	2019-11-06 14:10:35.328+00	2019-11-06 14:24:10.498+00	97dd2c13-72a3-4537-8ba6-83cb00779d28
32f97555-8d15-49f7-b12d-b17df867d85d	Steve	D	steve@catipult.ai	$2a$10$qNA8DQjS76aWtRVgIJA7KOUF0XzDeIlqhm2nc/yiXab8z2mgTb.Sa	The year is and I want to travel.	0	\N	0	2019-11-11 13:54:07.985+00	2019-11-11 13:56:18.925+00	b29d6869-14ea-4d96-afa0-81a66d56a51a
d6723afb-2d45-43fc-a10f-f0a80765f73d			redhat@armyspy.com	$2a$10$R73mmAW40eEhjqAEc5xa0uleN8YUJ2s8HDUocWLYv3DXb0AYFnL6a	0	0	\N	admin	2019-11-29 12:05:07.625+00	2019-11-29 12:05:07.625+00	6e44e331-3ed1-4032-9ddb-411d0cf04637
d41ae237-6a31-46d3-8176-f999d3524366	redhat user 1	redhat user 1	redhatuser1@armyspy.com	$2a$10$5n11sjw0UH4XdUf1SUs9FesVKTsAImOnF4ij.J2LjyTrL1Lg1W0S6	0	0	\N	0	2019-11-29 12:54:13.886+00	2019-11-29 12:54:13.886+00	a49075ca-a8ba-4435-bfb7-126bcb3060d7
1b0bdda8-3dcf-4582-8275-0e8d5a5f8db9	user3	user3	user3@armyspy.com	$2a$10$prZjAFbYpXBU2dUmN5.rZexzopj9gtga0M.IsJIcT6ok8TeN9HTvi	0	0	\N	0	2019-12-06 07:30:57.06+00	2019-12-06 07:30:57.06+00	b72bed3b-439c-4c8a-bac1-a763fddfac91
f2c4b262-f4c5-426a-a2bd-a67b68c4faf1	user4	user4	user4@armyspy.com	$2a$10$dfqg3qibV7bTIVoYmCUSPupe20UaEpAlZ/5rWvmKolsQgHAoSeQR.	0	0	\N	0	2019-12-06 07:33:03.043+00	2019-12-06 07:33:03.043+00	b72bed3b-439c-4c8a-bac1-a763fddfac91
c2a5ae92-f7fc-4a2b-b441-374a51a79a52	user5	user5	user5@armyspy.com	$2a$10$0XugOLkyh08TS1h5HWE5TOnsLC0a5Pk1knqurVfAKYZf6TqOTDgom	0	0	\N	0	2019-12-06 07:35:47.722+00	2019-12-06 07:35:47.722+00	76cd7d9b-8081-4cd3-bff7-8edfaf60a00b
5955b75b-8337-4ef8-96b4-bf33ffaed3a1	user2	user2	user2@armyspy.com	$2a$10$lvF/Y5MT1jy2uexH4Z9m7u0qDkqpFCjdpsaChs6T9Mjjt3PCk/Lpa	infosys admin outcome stmt	0	\N	0	2019-12-06 07:18:55.478+00	2019-12-06 07:39:38.45+00	45cc28fe-ea2b-468f-a85a-a98b83fb28d1
4333def3-348e-4ba1-b505-ea032c1e2f0c	fgf	gfg	ramesh@superrito.com	$2a$10$Vv1fOnQTgZm0DR8R69f2EeXR5DxfX9wU09TC8NGZok3tLrFtNy73e	0	0	\N	0	2019-12-06 01:29:02.712+00	2019-12-06 01:29:02.712+00	5d03af33-b7ae-49e1-8c41-2a84fd398bcc
0b630269-4e22-415a-83b0-578c2fe60240	roebrt	ff	robert@armyspy.com	$2a$10$AlFI5o5yPO.tifWywNe3peBRmd.K2hq8yUnPHKNXa6epHRuzx79.O	dfds	37537	\N	0	2019-11-15 05:57:31.678+00	2019-11-16 05:55:34.154+00	a42c344c-8e98-42f1-89b8-721fac7587f0
c5868bf6-6530-4879-ad03-4903514bb7a5			infosys@armyspy.com	$2a$10$DHfKJsRhITOavHYihoxFROOzjA36rWhrJ2F2lZVhV4X89I65WjGCy	0	0	\N	admin	2019-12-06 06:41:41.363+00	2019-12-06 06:41:41.363+00	45cc28fe-ea2b-468f-a85a-a98b83fb28d1
c25e0969-ab71-49b3-a564-a7145087ed5e			jam@livefused.com	$2a$10$lquAbVCy8zQMtvYMDgUqKOEMm9j67WV3oP7U5lW2uh8PbDn1qqEYq	0	0	\N	admin	2019-12-31 16:12:02.395+00	2019-12-31 16:12:02.395+00	e07de7e7-eb03-4588-872d-2909adb33ee4
1b885225-2215-4098-9235-b01e6737b226	sana		sana@armyspy.com	$2a$10$SIphQ/ZT1zC7OYqmnpo7uO/8N4M4lBaSM7GeNHw4Fn1AnkYbM9MHS	stmt1	11905	{"comName":"Akon2018","companyAddress":"koregaon park pune","dob":"2020-04-13T11:36:38.648Z","gender":"Female","photo":"1586777816025.jpg"}	admin	2019-11-06 11:45:30.653+00	2020-04-13 11:36:58.961+00	5d03af33-b7ae-49e1-8c41-2a84fd398bcc
0f858a6a-8a18-4a57-889f-28255a250d82			tcs@armyspy.com	$2a$10$xZRbpzVRYHYR3J2jwnzh2OLLR2fvbV9fBLy6Q.mCNERYYAzfWtHfu	0	0	\N	admin	2019-12-09 07:22:39.433+00	2019-12-09 07:22:39.433+00	2bddffff-4230-4547-99ce-35519ddccc00
02581e35-def1-4f63-88c6-919a33177046			pfuller1@mac.com	$2a$10$qRGviJxil0vbUrfO4iEKHuifg5c5gb4PfN6kFa64n3NYl.Rt4SHSu	The year is 2023 and I am....	0	{"comName":"","companyAddress":"","dob":"Fri Jan 10 2020 13:45:07 GMT-0500 (Eastern Standard Time)","gender":"","photo":"1578682184313.jpg"}	admin	2019-11-15 21:57:32.461+00	2020-01-10 18:50:10.857+00	6e238eb1-91b1-43bd-89d5-be2f4507cc68
cfb31b8a-b1a5-4b86-86aa-62278f45dbd8	sana	sayyed	sana.s@akoninfotech.com	$2a$10$fNfBaAa47yzKfFAvJyC/1.70gPFOwj6uq4iNJ3j9aeC0CaOqEJkHu	cvbxcvbxcvb	0	\N	0	2019-11-06 11:47:25.915+00	2019-12-12 12:31:37.271+00	97dd2c13-72a3-4537-8ba6-83cb00779d28
3b2aaca7-c7d7-411c-b120-1baff5abe371			sanas@armyspy.com	$2a$10$.qIgBLh0hYVANttRV/V0ReUeaNosLa9GwYIkau38KPfIgE8jpL6em	Stmt 1	0	\N	admin	2020-01-01 08:41:42.742+00	2020-01-01 10:34:29.5+00	bdfadadf-ee09-4a44-baec-435c00e0231f
4ddfa06a-5f7a-4c4d-a391-562ab8e54186	Animesh	NIID	test14@niidtech.com	$2a$10$YXCWvw8yhqH9B8ujwdrVD.USFcFkyb2R226nYSn4NAXZ6gnrVgk2.	0	0	\N		2020-03-12 15:41:54.138+00	2020-03-12 15:41:54.138+00	8aa21d91-b11a-4c57-855e-b2730095f977
467da7ac-d42c-411c-b95b-d3d28dae2e10			86executiveclub@catipult.ai	$2a$10$ygUB4tQ3ednTocRkQRTUXul.EvcmIGRnVLr.rkinrJhA/QvmtLblC	The year is and I a am...	0	{"comName":"Self Employed","companyAddress":"","dob":"Mon Dec 14 1970 00:00:00 GMT-0500 (Eastern Standard Time)","gender":"Male","photo":"1579865261871.jpg"}	admin	2019-12-31 16:52:05.509+00	2020-01-27 23:50:13.039+00	715225ae-41c6-4992-8921-8c39fb92b9f3
bb25eeac-d80f-475e-a1f1-2ec7b27c7139	Demo	Two	demo2@catipult.ai	$2a$10$qoQoVyiLfzMKH1NLMjfhGuXciXxnVN.XTDWFmRm.Zs2KGgqaIo4d6	0	0	\N	0	2020-01-01 15:06:40.112+00	2020-01-01 15:06:40.112+00	aaae2108-4d52-436d-8f1b-cfd385ae4a69
98dcd4f1-8fc4-4a10-9834-1e9c4a6460d6			jharvey@equian.com	$2a$10$HoFeKb3JOEnBbiXOxl8RV.Go3d3s0UiyTuJ34Jr/UHYil2ozqJzeq	Test	0	\N	admin	2019-12-13 21:18:07.729+00	2020-01-14 18:07:53.75+00	764375c2-d46d-4f53-83c8-b492def306f0
0bbd8b06-e0fb-40b4-a0fd-10f9718ebb2b	Ramesh	taurani	bharat2020@superrito.com	$2a$10$113Id2yIRl6FpFXkDe89qutaUzI.jIxfxlyit6BUi57daOW/dQjIi	fgf	0	\N	admin	2020-01-07 13:14:27.659+00	2020-01-27 14:12:21.56+00	2bae918e-ec9e-4235-b8b6-9a8bbb5aec5c
ccdcfb92-7b5f-435c-8a5a-3b88b0466785	sanah		sana@teleworm.us	$2a$10$72qsPywzhYbhohug2Qc6z.d99CWO1XOlv8eRalyPzMw4L.v/czok6	stmt 1	0	{"comName":"","companyAddress":"","dob":"2020-01-20T10:14:56.089Z","gender":"","photo":"1579586813977.jpg"}		2020-01-09 12:12:42.337+00	2020-01-21 06:13:13.768+00	c5c24efa-fcb0-4c0e-af06-cf0dc87122dd
f90f8ec1-acf5-46e0-ad1e-1aef5eb0cec2	sana	sayyed	sana@superrito.com	$2a$10$OnlkcjyXU72WohScVPZoFuejJ5VSmpJZt99CLnXBq6jaMREYqPrKC	outcome stmt	69827	\N		2020-01-13 07:41:20.207+00	2020-02-19 13:08:38.375+00	c5c24efa-fcb0-4c0e-af06-cf0dc87122dd
8d15dd8f-d2c9-4733-b28c-66671b2939e0			rohanrane69@gmail.com	$2a$10$n9pPYK8x81SxwVakdpLe6uXtnyFuMpVTptTwmWj6Xgn7ErOfD51Im	0	93504	\N	admin	2019-12-06 05:15:07.729+00	2020-02-11 13:38:00.318+00	1985e1b6-ac49-4d83-a4af-12e6558fdb6b
c387a67a-ee1f-48e8-85c0-8970040ed701	Mehron	NIID	test15@niidtech.com	$2a$10$1CU2xliuWWS6IUjWvCTLpulL/CQT9yMx2iAK4jRyWPTAQebhmf1ue	0	0	\N		2020-03-12 15:43:22.051+00	2020-03-12 15:43:22.051+00	899790bf-36f2-4666-9395-94c97eec3ef4
03e327ef-7ebe-4891-b7bd-9f4c531a5996	Shushant	NIID	test16@niidtech.com	$2a$10$9pP2R5NUAVk3C7bn8ryn9.3ZhpkyJUVKXgEEj8kHawz5Asi3BJGde	0	0	\N		2020-03-12 15:44:46.551+00	2020-03-12 15:44:46.551+00	46c04f41-c6be-4533-b79a-fe587fdbaf43
1ca41177-5d2b-4507-9fb2-8e32b233f32a	Pratik	NIID	test17@niidtech.com	$2a$10$SiwE8qr606klpJ3fDN6uQeLsmhpxCjDFrlJEJs5CN5B6ktmJgFWSO	0	0	\N		2020-03-12 15:46:25.469+00	2020-03-12 15:46:25.469+00	5676e1ed-bcf5-4680-932c-3fe703c32837
fcf38be9-bcd3-4643-9352-43902831f654	bharat	bharat	bharatb1@niidtech.com	$2a$10$9oISEtsM2w7cNBtfDh7.nuEu4EmPBbvZnbbA.Q3X7hq1bm106igku	Hdggs	93011	{"comName":"Akon2018","companyAddress":"","dob":"Thu Feb 20 2020 00:00:00 GMT+0530 (India Standard Time)","gender":"Male"}	0	2019-11-06 11:48:23.589+00	2020-04-13 15:48:10.785+00	97dd2c13-72a3-4537-8ba6-83cb00779d28
5cc39b95-2000-4631-8ba1-d1ce1ce831b5	bharat	bonde	Incromment@jourrapide.com	$2a$10$38Ios1hrYXTKO2DC6FBiyOKOeQZ6yVei34wUr1QtlhRG5L1F3b306	0	0	\N	admin	2020-01-21 07:21:24.565+00	2020-01-21 07:21:24.565+00	bdfadadf-ee09-4a44-baec-435c00e0231f
efffbc1b-d12b-42b6-a4c3-d230ebe7cfee	ramesh	shetty	first@jourrapide.com	$2a$10$3UFI.MmdcC8laCu2rvk2O.U1XVA.O0pgOwJD1NcAx7NDwM0yDxu9S	0	0	\N		2020-01-21 07:24:20.535+00	2020-01-21 07:24:20.535+00	633a757f-a25c-460c-bb4b-13dc1877e149
648b13b0-8dd6-451c-9484-1463b076c7a3	tester	tester	tester@armyspy.com	$2a$10$4f5jAbaBhGC0v4yLr.8zLuGteTuGigleJyYlWW07lAblzefsR31q.	0	0	\N		2020-01-21 07:25:56.871+00	2020-01-21 07:25:56.871+00	ec9cbc23-59b8-443c-b602-248d8f356f57
efe64586-eda8-4ee7-8acb-c181ec48f526	sana	sayyed	sana@classesmail.com	$2a$10$rBd3cVNRSHtk80RLX8kzZutd7mcEnM7fg/oO0zVz3Akg4JXDZT3Ga	stmt1	0	{"comName":"test","companyAddress":"","dob":"","gender":""}	admin	2020-02-06 06:22:31.261+00	2020-02-06 06:58:13.529+00	ae313c51-8224-4dee-bbec-776600511d98
16f7976c-3a97-4d03-b68e-9dc4927a57b4	developer	developer	developer@armyspy.com	$2a$10$7BWEGqBZepwrrFyaJ4B8meDwq9KVVAZrKjRFHtmJQihp2T3iGNVHe	0	0	\N		2020-01-21 07:34:09.026+00	2020-01-21 07:34:09.026+00	3b7f3a25-c65c-46ad-8174-3ac503267431
77d53762-0d49-4308-b9c3-3e09e5abcee0	hr	hr	hr@armyspy.com	$2a$10$sB315jE5UpRk5K6Ih6lzU.AEUdm81oPZRuZdCz6alW2Yo4K16frbS	0	0	\N		2020-01-21 07:36:55.929+00	2020-01-21 07:36:55.929+00	3b136223-6b18-4ca6-93f4-aace3d487f57
04cbf1e5-e5d2-4526-8b90-f48653036ad3	sales	sales	sales@armyspy.com	$2a$10$YIvZHSjOgBrJgpeyH6TAeeT/RM9ucGvEVJGc5L658e0yNq7HAVaxu	0	0	\N		2020-01-21 07:38:41.087+00	2020-01-21 07:38:41.087+00	d86b7d60-afac-4c4b-bcb7-29e33288d213
4319a215-7bcc-43d1-a368-998dc70aedc8	marketing	marketing	marketing@armyspy.com	$2a$10$R02gtwB4bLCKUUMq7D3fAepaQrX1uBeGxY35H1VPi.garFrX1dsba	0	0	\N		2020-01-21 07:41:10.956+00	2020-01-21 07:41:10.956+00	08b4fb3b-78e5-427c-91ab-1f0f86a36dd3
cddad6a0-e88e-44a7-b76f-336be98111ad	Gopal	Rane	forse1962@einrot.com	$2a$10$ocEzMr7Dtu6Hdfqq6h54f.8w1Eyn4fDS6gOeffcpjwaNWQ7BiOxmK	mm.,mnmn	0	{"comName":"ROHAN RANE","companyAddress":"","dob":"Thu Jul 09 1987 00:00:00 GMT+0530 (India Standard Time)","gender":"Male","photo":"1583159019502.jpg"}		2020-01-30 11:22:27.063+00	2020-03-02 14:23:39.83+00	9b64e98c-53db-4094-bd6f-18abb062ad59
15513d5c-35d3-48c6-b01c-dfb1ce542f4c	Crystal	Werner	crystal@thetrailyouth.com	$2a$10$Frn41PoQGOtWAYYiNfuRZOS0iJJ1VmRQlngt.khVUO07/66rzZdK.	0	0	\N		2020-02-04 18:34:54.069+00	2020-02-04 18:34:54.069+00	c31c0e56-26e5-4b6e-a0dc-6888a71a947f
014b0e35-b913-4c8b-8f8c-7f30ab2b9f74	 developer	developer	developer@classesmail.com	$2a$10$AXB8OAfMLM4qe7Igq.KF/uVioqynX747FZgFMHkNB.cLgsb5Aqvl.	0	0	\N		2020-02-06 07:07:06.088+00	2020-02-06 07:07:06.088+00	6136f6ce-7472-4dcf-9ed4-864c1a7c09c3
6efa2ac2-37f1-47af-a75d-8cde982dc696	sana	sayyed	sansay@armyspy.com	$2a$10$StDu0Ex6967GoSYQj8wCwukEvr99ChZdPVeQNgBKKB5QpZe.YLj4m	mnm	0	\N	admin	2020-01-21 06:50:18.353+00	2020-03-03 12:35:58.429+00	fee167d4-43c1-4fab-b8eb-edc9b6e907ae
06f1b6be-7200-4e73-af46-f05d8932fac2	Ram	Rane	Coled1984@teleworm.us	$2a$10$t5V2Yvtd8/Ez4ZUEKVCj8uckDk2TDglGl6x/8FekcNc9hn2kFx6ei	Rrrrrrrdffghjh	0	{"comName":"ROHAN RANE","companyAddress":"","dob":"","gender":"","photo":"1583158969430.jpg"}		2020-01-25 13:32:27.25+00	2020-03-02 14:22:50.348+00	25ece8f7-3878-4725-b090-e0e0c3ce3318
10dd0793-9891-471a-b36f-254a6d8bc3dc	Aaron	Ulrich	ulrichar@msn.com	$2a$10$NpM0NdFq5WOnhZMhqQiSTuqa3Gfvav56VTvff7ZzffoVeTAQEl4i2	0	22887	\N		2020-02-04 18:31:32.174+00	2020-02-04 18:44:46.425+00	c31c0e56-26e5-4b6e-a0dc-6888a71a947f
b6410c77-6c5b-4546-90e0-f8f0567c9d53	Wendy	LAXTON	wendy@thetrailyouth.com	$2a$10$BPlQgg3yimhVh1O1fFV1xeTw3dy4hJo3rs1fepqU9x3MaeDm4Zr/S	something here	89890	{"comName":"The Trail Youth Coffee Home","companyAddress":"","dob":"Tue Feb 18 2020 00:00:00 GMT-0800 (Pacific Standard Time)","gender":"Female"}		2020-02-04 18:35:26.077+00	2020-03-30 17:46:30.567+00	c4ce6a56-0b79-4488-bc05-f593cec8f245
ebf8b5ed-1518-41ef-9863-cbb0492cbd90	sam	ralek	sama@superrito.com	$2a$10$G4bMhvUmqbVOp/Shv3oWQ.YsZ7oQocYTzUXM37Gt1CHwPBmS7p4mS	bdbdd	0	\N		2020-02-05 05:48:52.094+00	2020-02-05 06:28:04.193+00	f7c3923f-4a78-4b35-a148-2e022ec86d5f
f05972d5-bbd0-40f0-9206-ea8cbe649dc1	vc	dfd	sanapeter@armyspy.com	$2a$10$l0rWbpDlNtt6ffw1Y6rw..LtIGR4t7AiyF4ueVmuZDbwtlnciduV6	0	0	\N		2020-02-05 09:15:54.237+00	2020-02-05 09:15:54.237+00	fd1bea06-67b1-45f4-85ed-641a6b08762c
1bfcd4b4-59ff-4df6-825a-92b1e17f92e3	fgf	fdfdh	sapet@armyspy.com	$2a$10$jsuobpBTj5gYveIIJlVWOeRfhgVsevLEi4HSXX0h2yv9LyTKEqpcS	0	0	\N		2020-02-05 09:28:17.401+00	2020-02-05 09:28:17.401+00	a42c344c-8e98-42f1-89b8-721fac7587f0
9024fad9-7ad7-4e81-8d7a-630337e51c7f	hr	hr	hr@classesmail.com	$2a$10$2qGU.qUKbnfJ3m/d9EU0xOPcqyB8NU4y7OkpV8mc729DJjlZCciMO	0	0	\N		2020-02-06 07:02:16.55+00	2020-02-06 07:02:16.55+00	4f2d29d7-f440-4e9c-be11-8ffde273484f
8fb41c3a-c3d7-41dc-b49d-31e9e37f8e9d	Ramesh	Rane	Forse1963@einrot.com	$2a$10$EHes1rvUMZ5mWQ5KKJmvgOD5hM2XtD3ODU22/5HcU2Ec.IaLk7YIG	;asjkdx	0	{"comName":"","companyAddress":"","dob":"1987-07-08T18:30:00.000Z","gender":"Decline_to_say","photo":"1580800318545.jpg"}		2020-01-30 11:17:42.914+00	2020-02-05 12:21:10.942+00	bc60c442-4afe-4502-bdf7-34da825b7216
2632d43e-c376-46ff-bcd7-351e299fd68e	tester	tester	tester@classesmail.com	$2a$10$zvPVevzbUO7yKndMrwzoTuIJqExIekoAS8n2vY0X7u9H1G7e3ZNzq	0	0	\N		2020-02-06 07:05:41.789+00	2020-02-06 07:05:41.789+00	fc271cca-0144-41cd-b888-c7a8358469e1
214b28d3-9ad2-4ecb-a5c6-8730c82f47fb	Rohit	Rane	Disce194@armyspy.com	$2a$10$QmfqiFkwPKPIykd3cGbVXOW/HIFjhM10pb5sILwA3Ud62Hdmpd/1e	jashdjkahsd	0	{"comName":"","companyAddress":"","dob":"1987-07-08T18:30:00.000Z","gender":"Male","photo":"1580304320862.jpg"}		2020-01-18 11:43:49.199+00	2020-02-08 09:04:24.854+00	bc60c442-4afe-4502-bdf7-34da825b7216
feb55d3e-1e75-4ec5-b10b-e698ae8f2836	Amie	Martens	amie@laurakopetsky.com	$2a$10$.j.lzCyZ2T.DZgndDQ228.ImN4gTMAQPU8bf5K.aJKe4hKWC/QrHC	jbkjhkhjk	0	\N	admin	2020-02-10 19:45:57.79+00	2020-02-10 19:52:27.504+00	13a2a91f-8fd1-411b-9ba8-249d7ed1206b
2f76261a-73b3-4423-bd2d-7831ad42df3d	Kristen	Zuray	kristen@thetrailyouth.com	$2a$10$N.EJRXKO//5CucoOqrDDi.E33rzlsLka1lJzsgMjnNzHvHC6/xi6e	0	0	{"comName":"The Trail Youth Coffee Home","companyAddress":"PO Box 1196 North Bend Way, NB WA 98045","dob":"Fri Mar 29 1974 00:00:00 GMT-0700 (PDT)","gender":""}	admin	2020-02-04 18:18:30.763+00	2020-04-13 18:41:52.524+00	2e6bd6c5-c462-452d-823e-690d41504032
78985dc5-e67e-4ddc-938b-31d863dc3df9	Tonya	Guinn	guinntonya@gmail.com	$2a$10$wbqZNneRcxfJVCaMO4AcWuo29eK6ma/q2UlrECGtrpYLGKs6yKUN6	0	47859	\N		2020-02-04 18:46:19.219+00	2020-04-13 19:33:15.487+00	a46d5d7d-2813-4e6c-8842-89ea04ca094a
49000dfa-b73f-4da4-825c-8e68951c0e12	Jam	Snead	jsnead@catipult.ai	$2a$10$Vw5hBXCgAKXaDjzAj1wBoeYj71SmIHEN9vgKqXxrcziXmc3vYd/yG	0	0	{"comName":"Catipult, Inc.","companyAddress":"","dob":"","gender":"","photo":"1583162377097.jpg"}		2020-03-02 15:13:49.691+00	2020-03-02 15:19:37.107+00	0abc1d25-f868-4e5b-828f-56052e1fc842
78591a37-3a60-4acc-87fd-58d161dc4135	Shannon	Wenninger	shannon.wenninger@expresspros.com	$2a$10$R5BLPstGXuFbS9HcawpIEu3VNdb/PMtVqbFUvi8sDC5SylfmJhTDu	0	0	\N	admin	2020-02-26 19:25:57.96+00	2020-02-26 19:25:57.96+00	3992329c-dcdb-46fb-9f4f-8e50404508e9
1715b788-b5b3-472d-a9cd-d17b64756181	Jennifer	Harvey	jharvey@catipult.ai	$2a$10$p22vRAXzTAIeK3yo6SExD.nNZig/TNEB8MSSuujzgYRds4ci0G5YS	fd	11974	{"comName":"Catipult, Inc.","companyAddress":"","dob":"","gender":"","photo":"1583004932624.jpg"}		2020-02-20 23:26:44.946+00	2020-03-31 20:30:26.96+00	b85c9c09-7d68-4668-ad88-c2c1882565c8
90014cc3-c92c-4255-bb94-83ac9c01fd90	sada	dfdf	testcati@superrito.com	$2a$10$eNrWgTsJeC8lpItzXATfHuDJupOcX1c.nRf1C5U9Be0A2MqtrIM1m	fgfg	0	{"comName":"Akon2018","companyAddress":"","dob":"","gender":"","photo":"1584022251929.jpg"}		2020-03-11 10:11:05.608+00	2020-03-13 08:58:04.027+00	3cd4d755-1782-4c5d-994f-ea2c33d55ccc
be48312f-af3a-454e-afd3-f6894b305985	Peter	Fuller	peter@catipult.ai	$2a$10$QXKy0RC5HRPJE7hdS4yXxuIMFS2cqpMNzcJtLqfxpk3C/sQKSrSJe	the year is and i am ....dL;aksdjfa;slkjtw;lh	85853	{"comName":"Catipult, Inc.","companyAddress":"50 N Illinois St, Unit #808","dob":"2020-02-29T16:40:44.893Z","gender":"Male","photo":"1583005085183.jpg"}	admin	2020-02-19 18:15:16.953+00	2020-04-03 13:46:18.374+00	12a5a827-3e22-4799-aeb9-725b6740999e
c1462434-385c-40b2-ad67-df471962ad43	Trent	Dougherty	trent.dougherty@singlepointhcm.com	$2a$10$eMekbuwX1VUlATwa29WbieODOZdTAxZ0eECCy8Ubnzh4bhvz0K792	0	0	\N	admin	2020-03-06 16:32:58.179+00	2020-03-06 16:32:58.179+00	aa480497-931e-4ee6-a493-14c568921627
a9256fbf-b2eb-41e1-a78e-002a7e433966	Derrick	Christy	dc@approvedonline.com	$2a$10$d.SLL41ls04DOYnsRZb73OE5YRGDG00Irur2y9b6Ozm.0srWLEVCW	0	0	\N	admin	2020-03-06 16:34:43.756+00	2020-03-06 16:34:43.756+00	11a76579-e5de-4fe7-be25-aeec9c22151f
550f273d-609e-46c2-8170-0e46fcfef97a	Scott	Jarred	sjarred@jarredbunch.com	$2a$10$gYjhK0FEle0.ORGF1zGnzuOXndUWVus8TGjfa0WWykSCbnRqDqD26	0	0	\N	admin	2020-03-06 16:35:37.705+00	2020-03-06 16:35:37.705+00	0c68c3db-9eb3-4453-a7bc-a0806aa12efa
fbed5237-fc06-4b60-b3c8-047e56f476fb	Phil	Luzius	pluzius@catipult.ai	$2a$10$xRGEABbqTeBBQNPBSgQWPOWnlIc187QJNf7bGp1AoVyNLhmO1yspW	0	0	{"comName":"Catipult, Inc.","companyAddress":"","dob":"","gender":"","photo":"1583004706108.jpg"}		2020-02-29 19:29:44.439+00	2020-02-29 19:31:46.113+00	e2bd4af4-b978-4607-9b0a-d7cae771f4fd
25ea2de5-c4b8-443c-a387-8853e5c4a604	Rajesh	NIID	test1@niidtech.com	$2a$10$oSQ5gMDQStQQhE6cTExOwOVP2OmDb67L74ONnl1osSQIzY3eYi5ne	0	0	\N		2020-03-12 15:11:41.695+00	2020-03-12 15:11:41.695+00	9d47d600-be0a-436d-9f4d-e37ff39298d8
8335cd68-a734-4dc0-afdc-94828172fb54	Ram 	NIID	test2@niidtech.com	$2a$10$kictTjGxNngKjYlTL5oiF.TxBNFv2ykB0FVpsdn1iW0veeWl2S94i	0	0	\N		2020-03-12 15:13:30.69+00	2020-03-12 15:13:30.69+00	78372f40-6c07-4a41-8c53-871b81b73ab9
6930a28e-d283-4cbe-8d9b-9aa7232487ee	Rajesh	Rane	rrr123@armyspy.com	$2a$10$qhYjsTRsVerIlV1v2UlY2.Vy/YNhyEoqnhcUVzzqKd5k05G35Jce2	jasdh	0	{"comName":"ROHAN RANE","companyAddress":"","dob":"","gender":"","photo":"1583158843529.jpg"}		2020-01-18 10:36:42.674+00	2020-03-02 14:20:44.38+00	4ce95fc8-fb37-4bbb-be26-5ae9dd95cb5e
2398904f-6f55-4ff6-b58f-d4277abdbf8f	Nick	Kaleta	nkaleta@hotmail.com	$2a$10$HkbWuSiBjm6sMd/EHdcSpu3GDgRblEeluAu2.S0ipgygO8yivlv3a	Test	0	\N		2020-03-03 01:58:12.442+00	2020-03-03 02:00:47.657+00	a7110712-864c-4077-b04c-fcebb5e8a0da
a4a88578-13a5-4c27-9ea4-d936f710be4b	Rahul	NIID	test3@niidtech.com	$2a$10$KR73.XDgyjNUUi6G1sIb8O5gbMu4210RCZNBiHTb0gwNifsK8usAC	0	0	\N		2020-03-12 15:21:30.174+00	2020-03-12 15:21:30.174+00	192a99d1-4785-41a3-8dbb-b3bab1645eef
22cf7d8a-cb18-4876-bfd6-ceafb4019bed	sam	reddy	sam@gustr.com	$2a$10$1VGViASOd7PX6eOPOOqGmeKBkKCZNaeHgvVBhb6RNd4YgFlx0KuaO	To  get Financial freedom	0	\N		2020-03-05 14:15:52.16+00	2020-03-05 14:17:48.86+00	a42c344c-8e98-42f1-89b8-721fac7587f0
89134b99-2441-4e63-8852-043e0cdfb372	Michael	Manross	mmanross@catipult.ai	$2a$10$NVeyw6HE3a71wJq7pUnz1uwBOKAV9sqKa9.v7U0wOMjMmt4yUPxfW	sdlfjasdl;kfjas	41154	{"comName":"Catipult, Inc.","companyAddress":"","dob":"","gender":"","photo":"1583164613958.jpg"}		2020-02-20 23:31:11.798+00	2020-04-06 13:44:26.686+00	c7bc9456-ae64-4fb7-8f71-416712cedd4a
2cf60c89-1d80-4fa7-83c0-3140876f0933	Sana	NIID	test10@niidtech.com	$2a$10$lXRLKV3D9vjhnOj0HglNbOxny48f3xtCfwWxzixwHsKpXQ8/7IKnG	TEST	0	\N		2020-03-12 15:34:46.983+00	2020-04-11 10:57:18.073+00	addac93e-491c-4da1-8f23-3b0d68ada7e4
003c4f50-1e19-47c8-ab67-d7db6c9cb0dc	Amol	NIID	test5@niidtech.com	$2a$10$bljrkIfxmx2JOKB6C.nxmuQaqvTCL2jS7n0/VM9cNJNZIM6BX3jFS	0	0	\N		2020-03-12 15:24:51.513+00	2020-03-12 15:24:51.513+00	a73445f6-8faf-4998-a0d2-4d4d667dacaf
6f0cbc0c-416a-48a6-b06c-4e2e1c439ffb	Bharat	NIID	test6@niidtech.com	$2a$10$90/EIuHg3O/3P6seB5ePpenoIoA0DukUrdgVDiTIPxZ7wlIu8r60.	0	0	\N		2020-03-12 15:26:27.261+00	2020-03-12 15:26:27.261+00	55f5c377-87ed-4761-a867-947879953310
42a71dd8-7ced-4c30-9154-fd3974f8a536	Ganesh	NIID	test7@niidtech.com	$2a$10$ucsTrzB0LUoA1Vii5pyPTO7dd/cXMxPIfi35vi90Is1gXz/jD63pK	0	0	\N		2020-03-12 15:28:17.561+00	2020-03-12 15:28:17.561+00	5cb4f49a-ae67-4ddc-964f-b0021f5019a0
432f19e0-77c1-4d3c-aac6-25123409fe5d	Santosh	NIID	test12@niidtech.com	$2a$10$IDYDvxkP0NelkODYZmgDeurQaIErnjkTzeLd9U5nGNGPgJKBgWSGi	TEST	0	\N		2020-03-12 15:39:20.35+00	2020-04-13 12:09:03.165+00	42c9ce6e-7eaa-44c6-98ad-291309870cc3
fa11c3c7-06a9-4330-9fa7-49f9b24dfcd6	Vijay	NIID	test8@niidtech.com	$2a$10$UjoupSNGWTr7zOm1L.VrqOplZysMW3NnOY0V0ZSJfECjLbSVdFflu	dfdfd	0	\N		2020-03-12 15:30:02.904+00	2020-04-09 05:25:09.21+00	b40fd733-5ef2-4cd5-9bbf-c195b46e9284
66e822ab-bea7-422c-bd66-2edf477a7511	Rohit	NIID	test4@niidtech.com	$2a$10$i8iVfYcYo2sBDD7MLZmj4eGzDyAc3WFeaYiCS7p4lBajAUBxyehLS	test	0	\N		2020-03-12 15:23:02.418+00	2020-04-08 13:29:42.856+00	f8edc05e-9509-4264-a3df-bc4d3bc8e328
30a9c98c-ad5e-4f95-9f54-39512aebf323	Rohan 	Rane	rohanr@niidtech.com	$2a$10$pvv../C1CPMLMGURd/vqGOLib38TR2eKW8nHxrAuadbsBDodr.Ec6	0	30905	{"comName":"NIID TEST CATIPULT","companyAddress":"","dob":"","gender":"","photo":"1584540337661.jpg"}	admin	2020-03-12 13:37:29.951+00	2020-04-13 09:49:44.683+00	b9dba0a5-cc92-4027-98f4-199b7fc46232
2272739c-7ef5-4e26-b848-17a66de0ec61	Deepak	NIID	test9@niidtech.com	$2a$10$K4EC7J1bsixs00Uoojgjv.lmdKHttNUhFc6eMiV5mFbjF5vqgB9ye	TEST	0	\N		2020-03-12 15:32:10.877+00	2020-04-13 06:48:40.397+00	e5f7931e-5b95-4399-a86a-42527e26bd0c
1195c0fb-eb76-4165-9b5e-08b43aeb9329	Ashutosh	NIID	test11@niidtech.com	$2a$10$fxmuXi4zUuGQ3IFEitjH3umV5eokPCuDO5qIg/HCZOEZsNI8B/tpW	Test	0	\N		2020-03-12 15:37:43.058+00	2020-04-13 08:44:57.018+00	6db00128-8efe-4ac4-b099-1c3b7108ba95
94eb5e7c-4100-4d6e-8caa-63815eff76b6	jayesh	patel	testca@superrito.com	$2a$10$osdwRiS8mL/HM1OnBdname4kPd518YyIWhOu/3QCB7vU0hjPGdsUa	0	94980	\N		2020-03-12 12:09:44.959+00	2020-04-16 05:25:51.953+00	3cd4d755-1782-4c5d-994f-ea2c33d55ccc
16a8b434-dad4-427b-b3df-a422ef253e4e	support	first	supporthead@superrito.com	$2a$10$c5a5xk8wPz6yesDl4PYhp.ddbfKEVGWfk7GnaWnbgifjUQmrUjG1q	0	0	\N		2020-03-13 09:13:16.716+00	2020-03-13 09:13:16.716+00	314d90de-02b5-40b0-8794-e5fd769d208f
39b0753b-1a69-4c8a-bc7d-e0eaf6857ebf	test	test	supporthe@superrito.com	$2a$10$r7nxaLY9J/zd8JCBVUAwqOfMVk2DO.Wm2Dnu5CMM9A7nspvROmuD2	0	0	\N		2020-03-13 14:07:56.179+00	2020-03-13 14:07:56.179+00	75be138e-d588-4c93-be83-f05624310a00
75861c88-70f9-4070-8970-7fd58237aa1a	Chase	Flashman	chase@shipsights.com	$2a$10$k/eirDVFAuxxloruVuqrQO7.XMsRt3iTg6oHu2g216CQ2NTgZzQRC	The year is 2023 and I am 185 pounds and spending 40 percent of my time with my family and having 4 dates per month with my wife, I am the CEO of my company.  I have $6M in net worth, I have 5 direct reports, $1.5M in operating capital.	0	{"comName":"ShipSights","companyAddress":"","dob":"2020-04-16T21:24:15.898Z","gender":"Male","photo":"1587072266952.jpg"}	admin	2020-03-24 18:48:51.224+00	2020-04-16 21:24:26.956+00	42d94d1d-3c96-4e2c-a9fc-64a844878411
323905a9-4a27-49ac-af95-2938f9324008	Abhijeet	NIID	test13@niidtech.com	$2a$10$FY8YNzgNIKdlsbO6Y2ivke4mGlnLt0UvnzTyTvfEz/YlEcdV8HvLe	first	0	\N		2020-03-12 15:40:38.641+00	2020-03-17 10:49:45.423+00	1aa0ed49-be09-4f31-ae30-b9fdb4c414e2
4294bbd3-a527-4814-a584-1711ca75cc1b	Sundaresh	Ramanathan	sr@sundareshr.com	$2a$10$W/LqyBMIRNfz3qqxWfjLxe2jWATwjkY1tLTMl3sKesLJVBRZwKp5m	0	0	\N	admin	2020-03-23 20:24:11.946+00	2020-03-23 20:24:11.946+00	131e4505-bc82-4462-a6f1-54f8d8e51425
abe27836-ff9d-4408-a65f-3023f936bfb8	Sam 	Smith	sam.smith@rcre.com	$2a$10$8NDgG3wMoICd0F5fZGdnCeDCZlm4kendTvvoxB026kmct2GI4OotO	the	0	{"comName":"RCRE","companyAddress":"","dob":"","gender":"Male","photo":"1587072432767.jpg"}	admin	2020-04-06 12:59:08.723+00	2020-04-16 21:27:12.83+00	2d4eb356-e7c6-44ce-a5f6-c3463dfe8345
3e8ea067-d055-4233-bf32-1bc25c56dfa4	Susan	Rozzi	susan@rozziandassociates.com	$2a$10$0j/EK56ZdlJmXfvp4lm2FuwvaMPngvgmd8dTXIjGEg9o1WYC38NAi	0	0	\N		2020-03-26 17:56:28.576+00	2020-03-26 17:56:28.576+00	59773de2-26c7-4503-9fb7-d6f28031cab1
6d8e41af-46bc-49d1-8562-15a9ad4b8d5e	Cathy	Langham	cathylangham@elangham.com	$2a$10$EKXlIQ0f4JI5.FYEAAWqyuwRSWp9rdMJw.KfySX6dKG7nSr5HFIPy	0	0	\N	admin	2020-03-31 20:38:31.016+00	2020-03-31 20:38:31.016+00	df135241-2e82-4803-baf4-d41a8e2d0fe8
9cea0a49-1e33-4603-ad7f-e74840f505ae	Justin	Hart	jhart@approvedmortgage.com	$2a$10$DuBy3gcuMMmbBPvxuj7p0.jIhNsPh4jLdHLotR/UfgpK14Ch9NT/O	the year is ...	0	\N		2020-03-31 17:46:10.957+00	2020-04-01 16:26:15.171+00	ad77ea50-3501-40ec-94fd-da48c56519ad
cc5cb668-98b0-481c-ad02-72c85e0265f1	Tyler	Keller	tyler@directconnectlogistix.com	$2a$10$QSNRqj7NcztHMkxKs/DC2edH.rkK1irJBrqHpt2PSp0WOslPNyDGu	0	53438	\N		2020-04-07 12:39:27.582+00	2020-04-07 12:51:26.839+00	2c97407a-2fa0-4d5d-a6ac-15e91d98ac6e
571d7fee-c313-4143-afa7-e1e188622197	Acme	Raj	acmeraj@catipult.ai	$2a$10$GOmjH9kg.zu/IdCxg2EKEO7xzYwp6u0RUxucmkzN27G8p9gBpg0ua	0	0	{"comName":"Acme Awning Company Complete","companyAddress":"","dob":"","gender":"","photo":"1586637370211.jpg"}		2020-04-07 19:55:58.29+00	2020-04-11 20:36:10.311+00	7e96087d-1a5e-4512-a6a5-f5b63e272d79
c9f06ec8-e835-4e9b-8997-6705999c8bb5	Chirag	NIID	test18@niidtech.com	$2a$10$wxdbZTr14E/DeQoAEZkreOdW0FMEB6Llq85ty4Ex3RrIeL.PtGLQK	TEST	0	\N		2020-03-12 15:48:09.045+00	2020-04-16 09:37:10.498+00	dadcd6cb-3a1d-41e5-ae74-a8645fa083c7
05325ab1-f85b-4212-adb3-3700b0059eef	test	test1	ragdg@superrito.com	$2a$10$kd4nEtt1R3FdVo2D/FY2B.tG0hd83z1TvB4jMtXbE/AyYEnvxK83u	0	0	\N	admin	2020-04-06 05:14:55.301+00	2020-04-06 05:14:55.301+00	91721220-d17a-41c8-b10a-5682849b0bf5
c53c73ae-840b-4e15-8a57-4dd232fb1282	Phil	Teague	pteague@rectifysolar.com	$2a$10$ePzKWCZFiwx2R8nVdh637e7tpUFTFaDX0n.PVzQoo2SoQ1V3pOM6C	0	0	\N	admin	2020-04-07 13:17:17.31+00	2020-04-07 13:17:17.31+00	4245a1f0-727d-49eb-a63f-7d138bd71617
f810e2d7-bfee-43d2-8750-e392eb4cb007	Greg	Humrichouser	greg@directconnectlogistix.com	$2a$10$8CBXZJFiK5AGL/zyxXhg9OWOrggxII9Rs6Ol5x1AgdydiyAHQiaUS	The year is and I am....professional. biz, personal	0	{"comName":"Direct Connect ","companyAddress":"","dob":"2020-04-06T14:32:14.421Z","gender":"Male"}	admin	2020-04-03 21:03:47.199+00	2020-04-06 14:32:16.877+00	fe77dd77-f180-4dd6-9776-706973df0ed9
c89d4546-5fe0-4e39-b884-dcb4ebc3b2f0	Acme	Jake	acmejake@catipult.ai	$2a$10$67.jpbS2MJH4pkhZROnn1OFOy0lkxpITZkqm9R7gJLLGRhADOUKqW	0	0	{"comName":"Acme Awning Company Complete","companyAddress":"","dob":"","gender":"","photo":"1586637920403.jpg"}		2020-04-07 19:53:09.656+00	2020-04-11 20:45:20.405+00	093fa12d-97be-4865-9cbd-395da59f63c1
899e4a90-56c3-4878-ad45-4d2213abfca7	Susan	McClain	susan@naturalsuccessinstitute.com	$2a$10$3OcnLk1GbKBRMy8tD2mJ8.m5n8yHyIvMZoB3CIxStkngXxn04SG2q	the year is....	0	{"comName":"Natural Success Institute","companyAddress":"5511 Auburndale Drive, Bargersville, IN  46106","dob":"Sat Mar 10 1973 00:00:00 GMT-0500 (Eastern Standard Time)","gender":"Female","photo":"1586375464042.jpg"}	admin	2020-04-02 20:12:00.161+00	2020-04-08 19:51:04.528+00	0f1e0338-402b-475e-8bb3-898fe6593d78
ca46ad0c-2fcb-45d7-becf-d19fcd29f97b	peter	Fuller	peter@livefused.com	$2a$10$PR5M0fVsmhKBP2hbdk/AEe/VcV8Wko8zB/P/szp78kRJfnYL1c8bG	jkhlkjhjkhkl	11491	{"comName":"","companyAddress":"","dob":"2020-02-02T20:01:53.225Z","gender":""}	super	2019-12-12 00:00:00+00	2020-04-10 13:33:17.029+00	103b6074-9702-444c-aa6e-ccebb83fce8a
3a64764d-07b0-4b9a-9e2f-267a946e6cea	Acme	Karen	acmekaren@catipult.ai	$2a$10$ymcJn/jYvUlHhlvULa//FeGNwryxuO2VS2/6zR.kQCxZEVzvCFw..	the yeqr	0	{"comName":"Acme Awning Company Complete","companyAddress":"","dob":"2020-04-10T18:31:34.738Z","gender":"Female","photo":"1586543520033.jpg"}	admin	2020-04-07 19:46:16.581+00	2020-04-10 18:55:17.839+00	afa93169-84a9-45fb-a26a-230b8414e995
f6f09a86-44bb-4364-8338-b483f4ab02a0	Acme	Bob	acmebob@catipult.ai	$2a$10$ha8yFfi6GK41cLfLqMQ6R.lAlX3SDX06iUF.dj1..6Cw1yzEfh7oa	kjhlkh	0	{"comName":"Acme Awning Company Complete","companyAddress":"","dob":"","gender":"","photo":"1586636343352.jpg"}		2020-04-07 19:51:31.492+00	2020-04-11 20:19:03.391+00	0d17c1dd-2731-4af0-b83d-ce7e8bb3a374
41d8c12e-9ee6-4a53-8236-00ddc93b5da5	Acme	Carmen	acmecarmen@catipult.ai	$2a$10$xg1b0m.ujTOHm/nkVuWXIeS59Q2vAlEqUEjqvPnv0jy1vYJpjtOEK	0	0	{"comName":"","companyAddress":"","dob":"","gender":"","photo":"1586637626708.jpg"}		2020-04-07 19:52:22.186+00	2020-04-11 20:40:26.711+00	69f1456b-d01d-4ba4-b66e-a2b7bff40cc8
23cd23b0-612f-4d1b-8306-d2cfd6b6dfeb	Corvigo	Carla	corvigocarla@catipult.ai	$2a$10$soFm2qCPEkvFwE3Taqucze2KZ8/9dMSmDFc1nU3ZOdcTyNfh5lG0S	the year is...	0	\N	admin	2020-04-14 16:19:47.506+00	2020-04-15 12:58:21.712+00	548f94f0-88d1-4fbd-bb49-b3322db43cef
a2bf350c-51a3-42cf-9323-deb7467518f8	Amber	Cleveland	acleveland@catipult.ai	$2a$10$yHVHmvfQ0lSFZWzwPQr1QujiuQWJeCHFaCq.Ef21awwc1s12spBa2	 ,  m,lhouh	96144	{"comName":"Catipult, Inc.","companyAddress":"","dob":"","gender":"","photo":"1583004298413.jpg"}		2020-02-29 19:22:51.132+00	2020-04-17 03:39:19.738+00	2b0fc6eb-ae7f-4825-9e03-51e368d73b54
bf6cc364-57e6-4e24-aff2-588dfe9dc1f0	Ken	Thieneman 	ken.thieneman@thienemanconstruction.com	$2a$10$IQjRtq.CPS3ihAeuFC08Z.pifd5olbJs4QAd3ejc/.fECwTkAMSQK	The year is an I am...	0	{"comName":"","companyAddress":"","dob":"1965-05-25T05:00:00.000Z","gender":"Male","photo":"1587047194611.jpg"}	admin	2020-03-06 16:37:27.718+00	2020-04-16 14:26:34.616+00	8e7a0ee0-7add-4a22-876f-686f7bd7c75c
cf02a32a-ab95-43e6-b533-be125c614e7a	Kevin	Hudson	kevin.hudson@rcre.com	$2a$10$osdwRiS8mL/HM1OnBdname4kPd518YyIWhOu/3QCB7vU0hjPGdsUa	0	48722	\N		2020-04-07 12:35:36.889+00	2020-04-15 13:15:36.613+00	00fab334-279e-434c-956e-5797f84c2a89
\.


--
-- Name: charpLog_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY "charpLog"
    ADD CONSTRAINT "charpLog_pkey" PRIMARY KEY ("charplogID");


--
-- Name: department_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY department
    ADD CONSTRAINT department_pkey PRIMARY KEY ("depID");


--
-- Name: deviceregister_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY deviceregister
    ADD CONSTRAINT deviceregister_pkey PRIMARY KEY ("depID");


--
-- Name: drivers_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY drivers
    ADD CONSTRAINT drivers_pkey PRIMARY KEY ("driverID");


--
-- Name: invites_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT invites_pkey PRIMARY KEY ("invID");


--
-- Name: kpi_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY kpi
    ADD CONSTRAINT kpi_pkey PRIMARY KEY ("kpiID");


--
-- Name: kpilog_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY kpilog
    ADD CONSTRAINT kpilog_pkey PRIMARY KEY ("kpilogID");


--
-- Name: leval_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY leval
    ADD CONSTRAINT leval_pkey PRIMARY KEY ("levalID");


--
-- Name: milestones_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT milestones_pkey PRIMARY KEY ("mileID");


--
-- Name: notification_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY ("notifyID");


--
-- Name: onboardingstatus_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY onboardingstatus
    ADD CONSTRAINT onboardingstatus_pkey PRIMARY KEY ("onboardingStatusID");


--
-- Name: option_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY option
    ADD CONSTRAINT option_pkey PRIMARY KEY ("optionID");


--
-- Name: organization_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY ("orgID");


--
-- Name: pagecontent_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY pagecontent
    ADD CONSTRAINT pagecontent_pkey PRIMARY KEY ("pagecontentID");


--
-- Name: quarterkpiassign_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY quarterkpiassign
    ADD CONSTRAINT quarterkpiassign_pkey PRIMARY KEY ("qkaID");


--
-- Name: quartersplit_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY quartersplit
    ADD CONSTRAINT quartersplit_pkey PRIMARY KEY ("qsID");


--
-- Name: questions_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY ("queID");


--
-- Name: questiontype_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY questiontype
    ADD CONSTRAINT questiontype_pkey PRIMARY KEY ("qtID");


--
-- Name: remainder_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY remainder
    ADD CONSTRAINT remainder_pkey PRIMARY KEY ("remainderID");


--
-- Name: rfp_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY rfp
    ADD CONSTRAINT rfp_pkey PRIMARY KEY ("rfpID");


--
-- Name: role_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY ("rID");


--
-- Name: section_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY section
    ADD CONSTRAINT section_pkey PRIMARY KEY ("sectionID");


--
-- Name: sectioncompleted_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY sectioncompleted
    ADD CONSTRAINT sectioncompleted_pkey PRIMARY KEY ("sectioncompletedID");


--
-- Name: settings_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY ("settingID");


--
-- Name: useranswer_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY useranswer
    ADD CONSTRAINT useranswer_pkey PRIMARY KEY ("uanswID");


--
-- Name: useroutcome_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY useroutcome
    ADD CONSTRAINT useroutcome_pkey PRIMARY KEY ("uoID");


--
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: catipult_cati; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("uID");


--
-- Name: charpLog_mileID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY "charpLog"
    ADD CONSTRAINT "charpLog_mileID_fkey" FOREIGN KEY ("mileID") REFERENCES milestones("mileID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: charpLog_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY "charpLog"
    ADD CONSTRAINT "charpLog_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: department_orgID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY department
    ADD CONSTRAINT "department_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES organization("orgID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: deviceregister_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY deviceregister
    ADD CONSTRAINT "deviceregister_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: invites_rID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT "invites_rID_fkey" FOREIGN KEY ("rID") REFERENCES role("rID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: invites_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT "invites_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kpi_driverID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY kpi
    ADD CONSTRAINT "kpi_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES drivers("driverID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kpi_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY kpi
    ADD CONSTRAINT "kpi_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kpilog_kpiID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY kpilog
    ADD CONSTRAINT "kpilog_kpiID_fkey" FOREIGN KEY ("kpiID") REFERENCES kpi("kpiID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kpilog_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY kpilog
    ADD CONSTRAINT "kpilog_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: milestones_kpiID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT "milestones_kpiID_fkey" FOREIGN KEY ("kpiID") REFERENCES kpi("kpiID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: milestones_mileReferID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT "milestones_mileReferID_fkey" FOREIGN KEY ("mileReferID") REFERENCES milestones("mileID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: milestones_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY milestones
    ADD CONSTRAINT "milestones_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: notification_mileID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT "notification_mileID_fkey" FOREIGN KEY ("mileID") REFERENCES milestones("mileID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: notification_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT "notification_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: onboardingstatus_pagecontentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY onboardingstatus
    ADD CONSTRAINT "onboardingstatus_pagecontentID_fkey" FOREIGN KEY ("pagecontentID") REFERENCES pagecontent("pagecontentID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: onboardingstatus_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY onboardingstatus
    ADD CONSTRAINT "onboardingstatus_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: option_queID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY option
    ADD CONSTRAINT "option_queID_fkey" FOREIGN KEY ("queID") REFERENCES questions("queID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: pagecontent_driverID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY pagecontent
    ADD CONSTRAINT "pagecontent_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES drivers("driverID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quarterkpiassign_mileID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY quarterkpiassign
    ADD CONSTRAINT "quarterkpiassign_mileID_fkey" FOREIGN KEY ("mileID") REFERENCES milestones("mileID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quarterkpiassign_qsID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY quarterkpiassign
    ADD CONSTRAINT "quarterkpiassign_qsID_fkey" FOREIGN KEY ("qsID") REFERENCES quartersplit("qsID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quarterkpiassign_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY quarterkpiassign
    ADD CONSTRAINT "quarterkpiassign_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quartersplit_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY quartersplit
    ADD CONSTRAINT "quartersplit_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: questions_driverID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT "questions_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES drivers("driverID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: questions_qtID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT "questions_qtID_fkey" FOREIGN KEY ("qtID") REFERENCES questiontype("qtID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: remainder_kpiID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY remainder
    ADD CONSTRAINT "remainder_kpiID_fkey" FOREIGN KEY ("kpiID") REFERENCES kpi("kpiID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: rfp_queID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY rfp
    ADD CONSTRAINT "rfp_queID_fkey" FOREIGN KEY ("queID") REFERENCES questions("queID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: role_depID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY role
    ADD CONSTRAINT "role_depID_fkey" FOREIGN KEY ("depID") REFERENCES department("depID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: section_driverID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY section
    ADD CONSTRAINT "section_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES drivers("driverID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sectioncompleted_sectionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY sectioncompleted
    ADD CONSTRAINT "sectioncompleted_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES section("sectionID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sectioncompleted_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY sectioncompleted
    ADD CONSTRAINT "sectioncompleted_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: useranswer_driverID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY useranswer
    ADD CONSTRAINT "useranswer_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES drivers("driverID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: useranswer_optionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY useranswer
    ADD CONSTRAINT "useranswer_optionID_fkey" FOREIGN KEY ("optionID") REFERENCES option("optionID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: useranswer_queID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY useranswer
    ADD CONSTRAINT "useranswer_queID_fkey" FOREIGN KEY ("queID") REFERENCES questions("queID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: useranswer_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY useranswer
    ADD CONSTRAINT "useranswer_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: useroutcome_uID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY useroutcome
    ADD CONSTRAINT "useroutcome_uID_fkey" FOREIGN KEY ("uID") REFERENCES users("uID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users_rID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catipult_cati
--

ALTER TABLE ONLY users
    ADD CONSTRAINT "users_rID_fkey" FOREIGN KEY ("rID") REFERENCES role("rID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: charpLog; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE "charpLog" FROM PUBLIC;
REVOKE ALL ON TABLE "charpLog" FROM catipult_cati;
GRANT ALL ON TABLE "charpLog" TO catipult_cati;
GRANT ALL ON TABLE "charpLog" TO catipult_test1;


--
-- Name: department; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE department FROM PUBLIC;
REVOKE ALL ON TABLE department FROM catipult_cati;
GRANT ALL ON TABLE department TO catipult_cati;
GRANT ALL ON TABLE department TO catipult_test1;


--
-- Name: deviceregister; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE deviceregister FROM PUBLIC;
REVOKE ALL ON TABLE deviceregister FROM catipult_cati;
GRANT ALL ON TABLE deviceregister TO catipult_cati;
GRANT ALL ON TABLE deviceregister TO catipult_test1;


--
-- Name: drivers; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE drivers FROM PUBLIC;
REVOKE ALL ON TABLE drivers FROM catipult_cati;
GRANT ALL ON TABLE drivers TO catipult_cati;
GRANT ALL ON TABLE drivers TO catipult_test1;


--
-- Name: invites; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE invites FROM PUBLIC;
REVOKE ALL ON TABLE invites FROM catipult_cati;
GRANT ALL ON TABLE invites TO catipult_cati;
GRANT ALL ON TABLE invites TO catipult_test1;


--
-- Name: kpi; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE kpi FROM PUBLIC;
REVOKE ALL ON TABLE kpi FROM catipult_cati;
GRANT ALL ON TABLE kpi TO catipult_cati;
GRANT ALL ON TABLE kpi TO catipult_test1;


--
-- Name: kpilog; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE kpilog FROM PUBLIC;
REVOKE ALL ON TABLE kpilog FROM catipult_cati;
GRANT ALL ON TABLE kpilog TO catipult_cati;
GRANT ALL ON TABLE kpilog TO catipult_test1;


--
-- Name: leval; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE leval FROM PUBLIC;
REVOKE ALL ON TABLE leval FROM catipult_cati;
GRANT ALL ON TABLE leval TO catipult_cati;
GRANT ALL ON TABLE leval TO catipult_test1;


--
-- Name: milestones; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE milestones FROM PUBLIC;
REVOKE ALL ON TABLE milestones FROM catipult_cati;
GRANT ALL ON TABLE milestones TO catipult_cati;
GRANT ALL ON TABLE milestones TO catipult_test1;


--
-- Name: notification; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE notification FROM PUBLIC;
REVOKE ALL ON TABLE notification FROM catipult_cati;
GRANT ALL ON TABLE notification TO catipult_cati;
GRANT ALL ON TABLE notification TO catipult_test1;


--
-- Name: onboardingstatus; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE onboardingstatus FROM PUBLIC;
REVOKE ALL ON TABLE onboardingstatus FROM catipult_cati;
GRANT ALL ON TABLE onboardingstatus TO catipult_cati;
GRANT ALL ON TABLE onboardingstatus TO catipult_test1;


--
-- Name: option; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE option FROM PUBLIC;
REVOKE ALL ON TABLE option FROM catipult_cati;
GRANT ALL ON TABLE option TO catipult_cati;
GRANT ALL ON TABLE option TO catipult_test1;


--
-- Name: organization; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE organization FROM PUBLIC;
REVOKE ALL ON TABLE organization FROM catipult_cati;
GRANT ALL ON TABLE organization TO catipult_cati;
GRANT ALL ON TABLE organization TO catipult_test1;


--
-- Name: pagecontent; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE pagecontent FROM PUBLIC;
REVOKE ALL ON TABLE pagecontent FROM catipult_cati;
GRANT ALL ON TABLE pagecontent TO catipult_cati;
GRANT ALL ON TABLE pagecontent TO catipult_test1;


--
-- Name: quarterkpiassign; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE quarterkpiassign FROM PUBLIC;
REVOKE ALL ON TABLE quarterkpiassign FROM catipult_cati;
GRANT ALL ON TABLE quarterkpiassign TO catipult_cati;
GRANT ALL ON TABLE quarterkpiassign TO catipult_test1;


--
-- Name: quartersplit; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE quartersplit FROM PUBLIC;
REVOKE ALL ON TABLE quartersplit FROM catipult_cati;
GRANT ALL ON TABLE quartersplit TO catipult_cati;
GRANT ALL ON TABLE quartersplit TO catipult_test1;


--
-- Name: questions; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE questions FROM PUBLIC;
REVOKE ALL ON TABLE questions FROM catipult_cati;
GRANT ALL ON TABLE questions TO catipult_cati;
GRANT ALL ON TABLE questions TO catipult_test1;


--
-- Name: questiontype; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE questiontype FROM PUBLIC;
REVOKE ALL ON TABLE questiontype FROM catipult_cati;
GRANT ALL ON TABLE questiontype TO catipult_cati;
GRANT ALL ON TABLE questiontype TO catipult_test1;


--
-- Name: remainder; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE remainder FROM PUBLIC;
REVOKE ALL ON TABLE remainder FROM catipult_cati;
GRANT ALL ON TABLE remainder TO catipult_cati;
GRANT ALL ON TABLE remainder TO catipult_test1;


--
-- Name: rfp; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE rfp FROM PUBLIC;
REVOKE ALL ON TABLE rfp FROM catipult_cati;
GRANT ALL ON TABLE rfp TO catipult_cati;
GRANT ALL ON TABLE rfp TO catipult_test1;


--
-- Name: role; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE role FROM PUBLIC;
REVOKE ALL ON TABLE role FROM catipult_cati;
GRANT ALL ON TABLE role TO catipult_cati;
GRANT ALL ON TABLE role TO catipult_test1;


--
-- Name: section; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE section FROM PUBLIC;
REVOKE ALL ON TABLE section FROM catipult_cati;
GRANT ALL ON TABLE section TO catipult_cati;
GRANT ALL ON TABLE section TO catipult_test1;


--
-- Name: sectioncompleted; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE sectioncompleted FROM PUBLIC;
REVOKE ALL ON TABLE sectioncompleted FROM catipult_cati;
GRANT ALL ON TABLE sectioncompleted TO catipult_cati;
GRANT ALL ON TABLE sectioncompleted TO catipult_test1;


--
-- Name: settings; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE settings FROM PUBLIC;
REVOKE ALL ON TABLE settings FROM catipult_cati;
GRANT ALL ON TABLE settings TO catipult_cati;
GRANT ALL ON TABLE settings TO catipult_test1;


--
-- Name: useranswer; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE useranswer FROM PUBLIC;
REVOKE ALL ON TABLE useranswer FROM catipult_cati;
GRANT ALL ON TABLE useranswer TO catipult_cati;
GRANT ALL ON TABLE useranswer TO catipult_test1;


--
-- Name: useroutcome; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE useroutcome FROM PUBLIC;
REVOKE ALL ON TABLE useroutcome FROM catipult_cati;
GRANT ALL ON TABLE useroutcome TO catipult_cati;
GRANT ALL ON TABLE useroutcome TO catipult_test1;


--
-- Name: users; Type: ACL; Schema: public; Owner: catipult_cati
--

REVOKE ALL ON TABLE users FROM PUBLIC;
REVOKE ALL ON TABLE users FROM catipult_cati;
GRANT ALL ON TABLE users TO catipult_cati;
GRANT ALL ON TABLE users TO catipult_test1;


--
-- PostgreSQL database dump complete
--

