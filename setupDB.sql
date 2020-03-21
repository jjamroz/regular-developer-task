DROP TABLE IF EXISTS products 

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name TEXT(255) CHARACTER SET `utf8mb4` NOT NULL,
    url TEXT(255) CHARACTER SET `utf8mb4` NOT NULL,
   prize FLOAT NOT NULL,
   PRIMARY KEY (id)
);

INSERT INTO products (name,url,prize) VALUES 
('Krew, pot i piksele. Chwalebne i niepokojące opowieści o tym, jak robi się gry',
'https://www.empik.com/krew-pot-i-piksele-jak-powstaja-gry-wideo-schreier-jason,p1203623595,ksiazka-p',
38.49),
('Domain-Driven Design',
'https://helion.pl/ksiazki/domain-driven-design-zapanuj-nad-zlozonym-systemem-informatycznym-eric-evans,domdri.htm'
,20.99),
('Człowiek vs Komputer',
'https://gynvael.coldwind.pl/?id=712',
15.15)