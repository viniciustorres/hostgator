create schema desafio_hostgator;
use desafio_hostgator;

create table products (
	idProduct int auto_increment not null,    
    `name` varchar(50) not null,
    `presentationName` varchar(50) not null,
    primary key PK_idProduct__products (idProduct)
);

create table cycles (
	idCycle int auto_increment not null,
    `name` varchar(20) not null,
    months int not null,
    primary key PK_idCycle__products (idCycle) 
);

create table productCycle (
	idProduct int not null,
    idCycle int not null,
    priceRenew decimal(8,2) not null,
    priceOrder decimal(8,2) not null,
    primary key (idProduct, idCycle)    
);

alter table productCycle
add constraint FK_productCycle__idProduct__products foreign key (idProduct) references products (idProduct),
add constraint FK_productCycle__idCycle__cycles foreign key (idCycle) references cycles (idCycle)