# Opis aplikacije
  Ova aplikacija je osmišljena kao sistem za upravljanje muzejima, sa posebnim funkcionalnostima namenjenim krajnjim korisnicima i administratorima. U njenoj osnovi nalazi se podrška za pregled i rezervaciju poseta muzejima, upravljanje korisničkim nalogom, kao i administrativni deo koji omogućava upravljanje muzejima i korisničkim porukama. Aplikacija koristi React za frontend i Laravel za backend, dok Axios služi za komunikaciju između frontenda i backend servera.
## 1. Pregled muzeja
Jedna od osnovnih funkcionalnosti ove aplikacije je pregled dostupnih muzeja. Korisnici mogu videti listu svih muzeja koji su dostupni u sistemu. Svaki muzej je predstavljen karticom koja sadrži osnovne informacije, uključujući:
•	Naziv muzeja
•	Opis muzeja
•	Lokaciju
•	Tip muzeja (istorijski, naučni, umetnički, itd.)
•	Cenu ulaznice
•	Slika muzeja
Korisnici takođe imaju mogućnost da pretražuju muzeje na osnovu imena, koristeći polje za pretragu, kao i da sortiraju muzeje po nazivu ili po ceni ulaznice. Ove funkcionalnosti omogućavaju korisnicima da brzo pronađu i pregledaju muzeje koji ih interesuju.
## 2. Rezervacija ulaznica za muzej
Aplikacija omogućava korisnicima da direktno preko aplikacije rezervišu ulaznice za određeni muzej. Klikom na dugme "Rezerviši" unutar kartice određenog muzeja, otvara se modalni prozor koji omogućava korisniku da unese broj karata i datum posete. Datum se ne može uneti u prošlosti, a ukoliko korisnik unese nevažeći datum, aplikacija prikazuje poruku o grešci. Nakon potvrde rezervacije, podaci se šalju na server gde se kreira rezervacija.
Korisnici mogu rezervisati više karata za različite muzeje, a svaka rezervacija sadrži detalje o muzeju, datum posete i broj kupljenih karata.
## 3. Upravljanje korisničkim nalogom
Korisnici mogu da se registruju i prijave na sistem preko posebnih formi za registraciju i prijavu. Prilikom registracije, korisnici unose svoje ime, email adresu i lozinku, a podaci se čuvaju u bazi podataka. Prijava omogućava korisnicima pristup dodatnim funkcionalnostima kao što je pregled njihovih rezervacija i mogućnost kreiranja novih.
Nakon uspešne prijave, korisnički podaci se čuvaju u sessionStorage zajedno sa tokenom za autentifikaciju, što omogućava jednostavno rukovanje korisničkim sesijama i sigurnom pristupu API resursima.
## 4. Pregled i otkazivanje rezervacija
Korisnici koji su prijavljeni mogu videti sve svoje trenutne i prošle rezervacije. Rezervacije se prikazuju u tabeli koja sadrži informacije kao što su:
•	ID rezervacije
•	Naziv muzeja
•	Datum rezervacije
•	Broj karata
•	Ukupna cena rezervacije
Korisnici takođe mogu otkazati buduće rezervacije, ali samo ako je datum posete u budućnosti. Za prošle rezervacije, otkazivanje nije omogućeno, što se jasno prikazuje u korisničkom interfejsu. U slučaju uspešnog otkazivanja, rezervacija se uklanja iz liste aktivnih rezervacija.
## 5. Generisanje PDF ulaznica
Za svaku rezervaciju, korisnici mogu generisati PDF ulaznicu direktno iz aplikacije. PDF sadrži sve potrebne informacije o rezervaciji, uključujući naziv muzeja, broj karata, datum posete, cenu ulaznice, kao i sliku muzeja. Uz to, PDF sadrži i bar kod generisan na osnovu ID-a rezervacije, koji može služiti za validaciju na ulazu u muzej. Ova funkcionalnost je posebno korisna za korisnike koji žele da imaju digitalnu ili fizičku kopiju svoje ulaznice.
## 6. Administrativni deo – Upravljanje muzejima
Aplikacija sadrži poseban deo za administratore koji omogućava upravljanje muzejima. Administrator može pregledati listu svih muzeja, dodavati nove muzeje, ažurirati informacije o postojećim muzejima i brisati muzeje koji više nisu relevantni. Svaki muzej sadrži sledeće podatke:
•	Naziv muzeja
•	Opis muzeja
•	Tip muzeja
•	Lokacija
•	Cena ulaznice
•	URL slike muzeja
U okviru administrativnog dela, administrator ima mogućnost kreiranja i ažuriranja muzeja kroz modalni prozor koji sadrži formu sa svim potrebnim informacijama. Nakon potvrde, muzej se kreira ili ažurira u bazi podataka.
## 7. Upravljanje korisničkim porukama
Još jedna funkcionalnost koja je dostupna administratorima jeste upravljanje korisničkim porukama. Svaki korisnik ima mogućnost da ostavi poruku u vezi sa određenim muzejom. Administrator može pregledati sve poruke koje su korisnici ostavili, filtrirati ih na osnovu sadržaja ili korisničkog imena, i po potrebi obrisati poruke koje nisu relevantne ili su neprimerene.
Poruke se prikazuju u tabeli sa sledećim informacijama:
•	ID poruke
•	Ime korisnika koji je poslao poruku
•	Naziv muzeja na koji se poruka odnosi
•	Sadržaj poruke
Poruke se mogu filtrirati na osnovu sadržaja ili korisničkog imena, što olakšava pronalaženje relevantnih poruka. Administratori mogu brisati poruke, a paginacija omogućava lakše navigiranje kroz veliki broj poruka.
