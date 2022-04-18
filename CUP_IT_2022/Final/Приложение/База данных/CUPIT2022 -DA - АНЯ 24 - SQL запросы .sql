CREATE TABLE "public.employee" (
	"ID_employee" serial(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "employee_pk" PRIMARY KEY ("ID_employee")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.work_time" (
	"ID_work_time" serial NOT NULL,
	"date" DATE NOT NULL,
	"working_hours" integer NOT NULL,
	"ID_employee" integer NOT NULL,
	"ID_subdivision" integer NOT NULL,
	CONSTRAINT "work_time_pk" PRIMARY KEY ("ID_work_time")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.subdivision" (
	"ID_subdivision" serial NOT NULL,
	"name" serial(255) NOT NULL,
	"ID_node" integer(255) NOT NULL,
	"ID_division" integer(255) NOT NULL,
	CONSTRAINT "subdivision_pk" PRIMARY KEY ("ID_subdivision")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.division" (
	"ID_division" serial NOT NULL,
	"name" serial(255) NOT NULL,
	"ID_node" integer(255) NOT NULL,
	"ID_cluster" integer NOT NULL,
	CONSTRAINT "division_pk" PRIMARY KEY ("ID_division")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cluster" (
	"ID_cluster" serial NOT NULL,
	"name" serial(255) NOT NULL,
	"ID_node" integer(255) NOT NULL,
	CONSTRAINT "cluster_pk" PRIMARY KEY ("ID_cluster")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.salary" (
	"ID_salary" serial(255) NOT NULL,
	"month" varchar(255) NOT NULL,
	"salary" integer NOT NULL,
	CONSTRAINT "salary_pk" PRIMARY KEY ("ID_salary")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.position" (
	"ID_position" serial(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "position_pk" PRIMARY KEY ("ID_position")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.pos_empl_sal" (
	"ID_position" integer NOT NULL,
	"ID_employee" varchar(255) NOT NULL,
	"ID_salary" serial(255) NOT NULL,
	CONSTRAINT "pos_empl_sal_pk" PRIMARY KEY ("ID_position","ID_employee","ID_salary")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.service" (
	"ID_service" serial(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "service_pk" PRIMARY KEY ("ID_service")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.pos_div_ser" (
	"ID_service" varchar(255) NOT NULL,
	"ID_position" integer NOT NULL,
	"ID_subdivision" serial(255) NOT NULL,
	CONSTRAINT "pos_div_ser_pk" PRIMARY KEY ("ID_service","ID_position","ID_subdivision")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "work_time" ADD CONSTRAINT "work_time_fk0" FOREIGN KEY ("ID_employee") REFERENCES "employee"("ID_employee");
ALTER TABLE "work_time" ADD CONSTRAINT "work_time_fk1" FOREIGN KEY ("ID_subdivision") REFERENCES "subdivision"("ID_subdivision");

ALTER TABLE "subdivision" ADD CONSTRAINT "subdivision_fk0" FOREIGN KEY ("ID_division") REFERENCES "division"("ID_division");

ALTER TABLE "division" ADD CONSTRAINT "division_fk0" FOREIGN KEY ("ID_cluster") REFERENCES "cluster"("ID_cluster");




ALTER TABLE "pos_empl_sal" ADD CONSTRAINT "pos_empl_sal_fk0" FOREIGN KEY ("ID_position") REFERENCES "position"("ID_position");
ALTER TABLE "pos_empl_sal" ADD CONSTRAINT "pos_empl_sal_fk1" FOREIGN KEY ("ID_employee") REFERENCES "employee"("ID_employee");
ALTER TABLE "pos_empl_sal" ADD CONSTRAINT "pos_empl_sal_fk2" FOREIGN KEY ("ID_salary") REFERENCES "salary"("ID_salary");


ALTER TABLE "pos_div_ser" ADD CONSTRAINT "pos_div_ser_fk0" FOREIGN KEY ("ID_service") REFERENCES "service"("ID_service");
ALTER TABLE "pos_div_ser" ADD CONSTRAINT "pos_div_ser_fk1" FOREIGN KEY ("ID_position") REFERENCES "position"("ID_position");
ALTER TABLE "pos_div_ser" ADD CONSTRAINT "pos_div_ser_fk2" FOREIGN KEY ("ID_subdivision") REFERENCES "subdivision"("ID_subdivision");











