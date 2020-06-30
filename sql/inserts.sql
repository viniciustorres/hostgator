insert into products (`name`, presentationName)
values ('planoP','Plano P'), ('planoM','Plano M'), ('planoTurbo', 'Plano Turbo');

insert into cycles (`name`,months)
values 
('monthly',1),
('semiannually',6),
('biennially',24),
('triennially',36),
('quarterly',3),
('annually',12);

insert into productCycle (idProduct, idCycle, priceRenew, priceOrder)
values 
-- planoP
(1,1,24.19,24.19),
(1,2,128.34,128.34),
(1,3,393.36,393.36),
(1,4,561.13,561.13),
(1,5,67.17,67.17),
(1,6,220.66,220.66),

-- planoM
(2,1,29.69,29.69),
(2,2,159.54,159.54),
(2,3,532.56,532.56),
(2,4,764.22,764.22),
(2,5,82.77,82.77),
(2,6,286.66,286.66),

-- planoturbo
(3,1,44.99,44.99),
(3,2,257.94,257.94),
(3,3,983.76,983.76),
(3,4,1439.64,1439.64),
(3,5,131.97,131.97),
(3,6,503.88,503.88);