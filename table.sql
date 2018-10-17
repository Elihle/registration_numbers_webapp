drop table if exists towns, registrations;
create table towns (
    id serial not null primary key,
    town_name text not null,
    town_tag text not null
);

create table registrations (
    id serial not null primary key,
    reg_number text not null unique,
    reg_id int not null,
    foreign key (reg_id) references towns (id)
);

insert into towns (town_name, town_tag) VALUES ('Select All', 'All');
insert into towns (town_name, town_tag) VALUES ('Cape Town', 'CA');
insert into towns (town_name, town_tag) VALUES ('Paarl', 'CL');
insert into towns (town_name, town_tag) VALUES ('Stellenbosch', 'CK');
insert into towns (town_name, town_tag) VALUES ('George', 'CAW');


