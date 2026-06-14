-- =====================================================
-- World Cup Fantasy - Complete Seed Data (Official World Cup 2026)
-- 48 National Teams - 240 Players
-- Tournament Rounds
-- =====================================================

-- =====================================================
-- PLAYERS (240 total - 5 per team)
-- =====================================================

-- === GROUP A ===

-- Mexico
INSERT INTO players (name, national_team, position, status) VALUES
('Santiago Gimenez', 'Mexico', 'FWD', 'available'),
('Hirving Lozano', 'Mexico', 'FWD', 'available'),
('Edson Alvarez', 'Mexico', 'MID', 'available'),
('Jorge Sanchez', 'Mexico', 'DEF', 'available'),
('Guillermo Ochoa', 'Mexico', 'GK', 'available');

-- South Africa
INSERT INTO players (name, national_team, position, status) VALUES
('Lyle Foster', 'South Africa', 'FWD', 'available'),
('Percy Tau', 'South Africa', 'FWD', 'available'),
('Teboho Mokoena', 'South Africa', 'MID', 'available'),
('Mothobi Mvala', 'South Africa', 'DEF', 'available'),
('Ronwen Williams', 'South Africa', 'GK', 'available');

-- South Korea
INSERT INTO players (name, national_team, position, status) VALUES
('Son Heung-min', 'South Korea', 'FWD', 'available'),
('Hwang Hee-chan', 'South Korea', 'FWD', 'available'),
('Lee Kang-in', 'South Korea', 'MID', 'available'),
('Kim Min-jae', 'South Korea', 'DEF', 'available'),
('Jo Hyeon-woo', 'South Korea', 'GK', 'available');

-- Czechia
INSERT INTO players (name, national_team, position, status) VALUES
('Patrik Schick', 'Czechia', 'FWD', 'available'),
('Adam Hlozek', 'Czechia', 'FWD', 'available'),
('Tomas Soucek', 'Czechia', 'MID', 'available'),
('Vladimir Coufal', 'Czechia', 'DEF', 'available'),
('Jindrich Stanek', 'Czechia', 'GK', 'available');


-- === GROUP B ===

-- Canada
INSERT INTO players (name, national_team, position, status) VALUES
('Jonathan David', 'Canada', 'FWD', 'available'),
('Cyle Larin', 'Canada', 'FWD', 'available'),
('Stephen Eustaquio', 'Canada', 'MID', 'available'),
('Alphonso Davies', 'Canada', 'DEF', 'available'),
('Maxime Crepeau', 'Canada', 'GK', 'available');

-- Bosnia and Herzegovina
INSERT INTO players (name, national_team, position, status) VALUES
('Edin Dzeko', 'Bosnia and Herzegovina', 'FWD', 'available'),
('Ermedin Demirovic', 'Bosnia and Herzegovina', 'FWD', 'available'),
('Miralem Pjanic', 'Bosnia and Herzegovina', 'MID', 'available'),
('Sead Kolasinac', 'Bosnia and Herzegovina', 'DEF', 'available'),
('Ibrahim Sehic', 'Bosnia and Herzegovina', 'GK', 'available');

-- Qatar
INSERT INTO players (name, national_team, position, status) VALUES
('Almoez Ali', 'Qatar', 'FWD', 'available'),
('Akram Afif', 'Qatar', 'FWD', 'available'),
('Hassan Al-Haydos', 'Qatar', 'MID', 'available'),
('Boualem Khoukhi', 'Qatar', 'DEF', 'available'),
('Meshaal Barsham', 'Qatar', 'GK', 'available');

-- Switzerland
INSERT INTO players (name, national_team, position, status) VALUES
('Breel Embolo', 'Switzerland', 'FWD', 'available'),
('Zeki Amdouni', 'Switzerland', 'FWD', 'available'),
('Granit Xhaka', 'Switzerland', 'MID', 'available'),
('Manuel Akanji', 'Switzerland', 'DEF', 'available'),
('Yann Sommer', 'Switzerland', 'GK', 'available');


-- === GROUP C ===

-- Brazil
INSERT INTO players (name, national_team, position, status) VALUES
('Vinicius Junior', 'Brazil', 'FWD', 'available'),
('Rodrygo Goes', 'Brazil', 'FWD', 'available'),
('Lucas Paqueta', 'Brazil', 'MID', 'available'),
('Marquinhos', 'Brazil', 'DEF', 'available'),
('Alisson Becker', 'Brazil', 'GK', 'available');

-- Morocco
INSERT INTO players (name, national_team, position, status) VALUES
('Youssef En-Nesyri', 'Morocco', 'FWD', 'available'),
('Hakim Ziyech', 'Morocco', 'MID', 'available'),
('Sofyan Amrabat', 'Morocco', 'MID', 'available'),
('Nayef Aguerd', 'Morocco', 'DEF', 'available'),
('Yassine Bounou', 'Morocco', 'GK', 'available');

-- Haiti
INSERT INTO players (name, national_team, position, status) VALUES
('Frantzdy Pierrot', 'Haiti', 'FWD', 'available'),
('Duckens Nazon', 'Haiti', 'FWD', 'available'),
('Bryan Alceus', 'Haiti', 'MID', 'available'),
('Carlens Arcus', 'Haiti', 'DEF', 'available'),
('Johny Placide', 'Haiti', 'GK', 'available');

-- Scotland
INSERT INTO players (name, national_team, position, status) VALUES
('Che Adams', 'Scotland', 'FWD', 'available'),
('Lawrence Shankland', 'Scotland', 'FWD', 'available'),
('Scott McTominay', 'Scotland', 'MID', 'available'),
('Andrew Robertson', 'Scotland', 'DEF', 'available'),
('Angus Gunn', 'Scotland', 'GK', 'available');


-- === GROUP D ===

-- USA
INSERT INTO players (name, national_team, position, status) VALUES
('Christian Pulisic', 'USA', 'FWD', 'available'),
('Folarin Balogun', 'USA', 'FWD', 'available'),
('Weston McKennie', 'USA', 'MID', 'available'),
('Antonee Robinson', 'USA', 'DEF', 'available'),
('Matt Turner', 'USA', 'GK', 'available');

-- Paraguay
INSERT INTO players (name, national_team, position, status) VALUES
('Antonio Sanabria', 'Paraguay', 'FWD', 'available'),
('Julio Enciso', 'Paraguay', 'FWD', 'available'),
('Miguel Almiron', 'Paraguay', 'MID', 'available'),
('Gustavo Gomez', 'Paraguay', 'DEF', 'available'),
('Carlos Coronel', 'Paraguay', 'GK', 'available');

-- Australia
INSERT INTO players (name, national_team, position, status) VALUES
('Mitchell Duke', 'Australia', 'FWD', 'available'),
('Craig Goodwin', 'Australia', 'FWD', 'available'),
('Jackson Irvine', 'Australia', 'MID', 'available'),
('Harry Souttar', 'Australia', 'DEF', 'available'),
('Mathew Ryan', 'Australia', 'GK', 'available');

-- Turkey
INSERT INTO players (name, national_team, position, status) VALUES
('Kenan Yildiz', 'Turkey', 'FWD', 'available'),
('Baris Alper Yilmaz', 'Turkey', 'FWD', 'available'),
('Hakan Calhanoglu', 'Turkey', 'MID', 'available'),
('Merih Demiral', 'Turkey', 'DEF', 'available'),
('Mert Gunok', 'Turkey', 'GK', 'available');


-- === GROUP E ===

-- Germany
INSERT INTO players (name, national_team, position, status) VALUES
('Niclas Fullkrug', 'Germany', 'FWD', 'available'),
('Kai Havertz', 'Germany', 'FWD', 'available'),
('Jamal Musiala', 'Germany', 'MID', 'available'),
('Antonio Rudiger', 'Germany', 'DEF', 'available'),
('Manuel Neuer', 'Germany', 'GK', 'available');

-- Curaçao
INSERT INTO players (name, national_team, position, status) VALUES
('Kenji Gorre', 'Curaçao', 'FWD', 'available'),
('Rangelo Janga', 'Curaçao', 'FWD', 'available'),
('Juninho Bacuna', 'Curaçao', 'MID', 'available'),
('Cuco Martina', 'Curaçao', 'DEF', 'available'),
('Eloy Room', 'Curaçao', 'GK', 'available');

-- Ivory Coast
INSERT INTO players (name, national_team, position, status) VALUES
('Sebastien Haller', 'Ivory Coast', 'FWD', 'available'),
('Simon Adingra', 'Ivory Coast', 'FWD', 'available'),
('Franck Kessie', 'Ivory Coast', 'MID', 'available'),
('Evan Ndicka', 'Ivory Coast', 'DEF', 'available'),
('Yahia Fofana', 'Ivory Coast', 'GK', 'available');

-- Ecuador
INSERT INTO players (name, national_team, position, status) VALUES
('Enner Valencia', 'Ecuador', 'FWD', 'available'),
('Jordy Caicedo', 'Ecuador', 'FWD', 'available'),
('Moises Caicedo', 'Ecuador', 'MID', 'available'),
('Pervis Estupinan', 'Ecuador', 'DEF', 'available'),
('Alexander Dominguez', 'Ecuador', 'GK', 'available');


-- === GROUP F ===

-- Netherlands
INSERT INTO players (name, national_team, position, status) VALUES
('Cody Gakpo', 'Netherlands', 'FWD', 'available'),
('Memphis Depay', 'Netherlands', 'FWD', 'available'),
('Frenkie De Jong', 'Netherlands', 'MID', 'available'),
('Virgil Van Dijk', 'Netherlands', 'DEF', 'available'),
('Bart Verbruggen', 'Netherlands', 'GK', 'available');

-- Japan
INSERT INTO players (name, national_team, position, status) VALUES
('Kyogo Furuhashi', 'Japan', 'FWD', 'available'),
('Kaoru Mitoma', 'Japan', 'FWD', 'available'),
('Takefusa Kubo', 'Japan', 'MID', 'available'),
('Maya Yoshida', 'Japan', 'DEF', 'available'),
('Zion Suzuki', 'Japan', 'GK', 'available');

-- Sweden
INSERT INTO players (name, national_team, position, status) VALUES
('Viktor Gyokeres', 'Sweden', 'FWD', 'available'),
('Alexander Isak', 'Sweden', 'FWD', 'available'),
('Dejan Kulusevski', 'Sweden', 'MID', 'available'),
('Victor Lindelof', 'Sweden', 'DEF', 'available'),
('Robin Olsen', 'Sweden', 'GK', 'available');

-- Tunisia
INSERT INTO players (name, national_team, position, status) VALUES
('Youssef Msakni', 'Tunisia', 'FWD', 'available'),
('Elias Achouri', 'Tunisia', 'FWD', 'available'),
('Ellyes Skhiri', 'Tunisia', 'MID', 'available'),
('Montassar Talbi', 'Tunisia', 'DEF', 'available'),
('Aymen Dahmen', 'Tunisia', 'GK', 'available');


-- === GROUP G ===

-- Belgium
INSERT INTO players (name, national_team, position, status) VALUES
('Romelu Lukaku', 'Belgium', 'FWD', 'available'),
('Jeremy Doku', 'Belgium', 'FWD', 'available'),
('Kevin De Bruyne', 'Belgium', 'MID', 'available'),
('Jan Vertonghen', 'Belgium', 'DEF', 'available'),
('Thibaut Courtois', 'Belgium', 'GK', 'available');

-- Egypt
INSERT INTO players (name, national_team, position, status) VALUES
('Mohamed Salah', 'Egypt', 'FWD', 'available'),
('Mostafa Mohamed', 'Egypt', 'FWD', 'available'),
('Trezeguet', 'Egypt', 'MID', 'available'),
('Mohamed Abdelmonem', 'Egypt', 'DEF', 'available'),
('Mohamed El Shenawy', 'Egypt', 'GK', 'available');

-- Iran
INSERT INTO players (name, national_team, position, status) VALUES
('Mehdi Taremi', 'Iran', 'FWD', 'available'),
('Sardar Azmoun', 'Iran', 'FWD', 'available'),
('Alireza Jahanbakhsh', 'Iran', 'MID', 'available'),
('Morteza Pouraliganji', 'Iran', 'DEF', 'available'),
('Alireza Beiranvand', 'Iran', 'GK', 'available');

-- New Zealand
INSERT INTO players (name, national_team, position, status) VALUES
('Chris Wood', 'New Zealand', 'FWD', 'available'),
('Ben Waine', 'New Zealand', 'FWD', 'available'),
('Sarpreet Singh', 'New Zealand', 'MID', 'available'),
('Liberato Cacace', 'New Zealand', 'DEF', 'available'),
('Oliver Sail', 'New Zealand', 'GK', 'available');


-- === GROUP H ===

-- Spain
INSERT INTO players (name, national_team, position, status) VALUES
('Alvaro Morata', 'Spain', 'FWD', 'available'),
('Nico Williams', 'Spain', 'FWD', 'available'),
('Lamine Yamal', 'Spain', 'FWD', 'available'),
('Aymeric Laporte', 'Spain', 'DEF', 'available'),
('Unai Simon', 'Spain', 'GK', 'available');

-- Cape Verde
INSERT INTO players (name, national_team, position, status) VALUES
('Ryan Mendes', 'Cape Verde', 'FWD', 'available'),
('Garry Rodrigues', 'Cape Verde', 'FWD', 'available'),
('Jamiro Monteiro', 'Cape Verde', 'MID', 'available'),
('Logan Costa', 'Cape Verde', 'DEF', 'available'),
('Vozinha', 'Cape Verde', 'GK', 'available');

-- Saudi Arabia
INSERT INTO players (name, national_team, position, status) VALUES
('Salem Al-Dawsari', 'Saudi Arabia', 'FWD', 'available'),
('Saleh Al-Shehri', 'Saudi Arabia', 'FWD', 'available'),
('Saud Abdulhamid', 'Saudi Arabia', 'MID', 'available'),
('Ali Al-Bulaihi', 'Saudi Arabia', 'DEF', 'available'),
('Mohammed Al-Owais', 'Saudi Arabia', 'GK', 'available');

-- Uruguay
INSERT INTO players (name, national_team, position, status) VALUES
('Darwin Nunez', 'Uruguay', 'FWD', 'available'),
('Luis Suarez', 'Uruguay', 'FWD', 'available'),
('Federico Valverde', 'Uruguay', 'MID', 'available'),
('Ronald Araujo', 'Uruguay', 'DEF', 'available'),
('Sergio Rochet', 'Uruguay', 'GK', 'available');


-- === GROUP I ===

-- France
INSERT INTO players (name, national_team, position, status) VALUES
('Kylian Mbappe', 'France', 'FWD', 'available'),
('Ousmane Dembele', 'France', 'FWD', 'available'),
('Antoine Griezmann', 'France', 'MID', 'available'),
('William Saliba', 'France', 'DEF', 'available'),
('Mike Maignan', 'France', 'GK', 'available');

-- Senegal
INSERT INTO players (name, national_team, position, status) VALUES
('Sadio Mane', 'Senegal', 'FWD', 'available'),
('Nicolas Jackson', 'Senegal', 'FWD', 'available'),
('Idrissa Gueye', 'Senegal', 'MID', 'available'),
('Kalidou Koulibaly', 'Senegal', 'DEF', 'available'),
('Edouard Mendy', 'Senegal', 'GK', 'available');

-- Iraq
INSERT INTO players (name, national_team, position, status) VALUES
('Aymen Hussein', 'Iraq', 'FWD', 'available'),
('Mohanad Ali', 'Iraq', 'FWD', 'available'),
('Ibrahim Bayesh', 'Iraq', 'MID', 'available'),
('Rebin Sulaka', 'Iraq', 'DEF', 'available'),
('Jalal Hassan', 'Iraq', 'GK', 'available');

-- Norway
INSERT INTO players (name, national_team, position, status) VALUES
('Erling Haaland', 'Norway', 'FWD', 'available'),
('Alexander Sorloth', 'Norway', 'FWD', 'available'),
('Martin Odegaard', 'Norway', 'MID', 'available'),
('Leo Ostigard', 'Norway', 'DEF', 'available'),
('Orjan Nyland', 'Norway', 'GK', 'available');


-- === GROUP J ===

-- Argentina
INSERT INTO players (name, national_team, position, status) VALUES
('Lionel Messi', 'Argentina', 'FWD', 'available'),
('Julian Alvarez', 'Argentina', 'FWD', 'available'),
('Rodrigo De Paul', 'Argentina', 'MID', 'available'),
('Cristian Romero', 'Argentina', 'DEF', 'available'),
('Emiliano Martinez', 'Argentina', 'GK', 'available');

-- Algeria
INSERT INTO players (name, national_team, position, status) VALUES
('Riyad Mahrez', 'Algeria', 'FWD', 'available'),
('Islam Slimani', 'Algeria', 'FWD', 'available'),
('Ismael Bennacer', 'Algeria', 'MID', 'available'),
('Ramy Bensebaini', 'Algeria', 'DEF', 'available'),
('Anthony Mandrea', 'Algeria', 'GK', 'available');

-- Austria
INSERT INTO players (name, national_team, position, status) VALUES
('Marko Arnautovic', 'Austria', 'FWD', 'available'),
('Michael Gregoritsch', 'Austria', 'FWD', 'available'),
('Marcel Sabitzer', 'Austria', 'MID', 'available'),
('David Alaba', 'Austria', 'DEF', 'available'),
('Alexander Schlager', 'Austria', 'GK', 'available');

-- Jordan
INSERT INTO players (name, national_team, position, status) VALUES
('Mousa Al-Tamari', 'Jordan', 'FWD', 'available'),
('Yazan Al-Naimat', 'Jordan', 'FWD', 'available'),
('Nizar Al-Rashdan', 'Jordan', 'MID', 'available'),
('Yazan Al-Arab', 'Jordan', 'DEF', 'available'),
('Yazid Abu Layla', 'Jordan', 'GK', 'available');


-- === GROUP K ===

-- Portugal
INSERT INTO players (name, national_team, position, status) VALUES
('Cristiano Ronaldo', 'Portugal', 'FWD', 'available'),
('Rafael Leao', 'Portugal', 'FWD', 'available'),
('Bruno Fernandes', 'Portugal', 'MID', 'available'),
('Ruben Dias', 'Portugal', 'DEF', 'available'),
('Diogo Costa', 'Portugal', 'GK', 'available');

-- Congo DR
INSERT INTO players (name, national_team, position, status) VALUES
('Yoane Wissa', 'Congo DR', 'FWD', 'available'),
('Cedric Bakambu', 'Congo DR', 'FWD', 'available'),
('Samuel Moutoussamy', 'Congo DR', 'MID', 'available'),
('Chancel Mbemba', 'Congo DR', 'DEF', 'available'),
('Lionel Mpasi', 'Congo DR', 'GK', 'available');

-- Uzbekistan
INSERT INTO players (name, national_team, position, status) VALUES
('Eldor Shomurodov', 'Uzbekistan', 'FWD', 'available'),
('Igor Sergeev', 'Uzbekistan', 'FWD', 'available'),
('Otabek Shukurov', 'Uzbekistan', 'MID', 'available'),
('Abdukodir Khusanov', 'Uzbekistan', 'DEF', 'available'),
('Utkir Yusupov', 'Uzbekistan', 'GK', 'available');

-- Colombia
INSERT INTO players (name, national_team, position, status) VALUES
('Luis Diaz', 'Colombia', 'FWD', 'available'),
('Rafael Santos Borre', 'Colombia', 'FWD', 'available'),
('James Rodriguez', 'Colombia', 'MID', 'available'),
('Davinson Sanchez', 'Colombia', 'DEF', 'available'),
('Camilo Vargas', 'Colombia', 'GK', 'available');


-- === GROUP L ===

-- England
INSERT INTO players (name, national_team, position, status) VALUES
('Harry Kane', 'England', 'FWD', 'available'),
('Bukayo Saka', 'England', 'FWD', 'available'),
('Jude Bellingham', 'England', 'MID', 'available'),
('John Stones', 'England', 'DEF', 'available'),
('Jordan Pickford', 'England', 'GK', 'available');

-- Croatia
INSERT INTO players (name, national_team, position, status) VALUES
('Andrej Kramaric', 'Croatia', 'FWD', 'available'),
('Ivan Perisic', 'Croatia', 'MID', 'available'),
('Luka Modric', 'Croatia', 'MID', 'available'),
('Josko Gvardiol', 'Croatia', 'DEF', 'available'),
('Dominik Livakovic', 'Croatia', 'GK', 'available');

-- Ghana
INSERT INTO players (name, national_team, position, status) VALUES
('Inaki Williams', 'Ghana', 'FWD', 'available'),
('Mohammed Kudus', 'Ghana', 'MID', 'available'),
('Thomas Partey', 'Ghana', 'MID', 'available'),
('Alexander Djiku', 'Ghana', 'DEF', 'available'),
('Lawrence Ati-Zigi', 'Ghana', 'GK', 'available');

-- Panama
INSERT INTO players (name, national_team, position, status) VALUES
('Cecilio Waterman', 'Panama', 'FWD', 'available'),
('Jose Fajardo', 'Panama', 'FWD', 'available'),
('Adalberto Carrasquilla', 'Panama', 'MID', 'available'),
('Fidel Escobar', 'Panama', 'DEF', 'available'),
('Orlando Mosquera', 'Panama', 'GK', 'available');


-- =====================================================
-- TOURNAMENT ROUNDS
-- =====================================================

-- Clear existing rounds first to avoid conflicts or outdated legs
DELETE FROM rounds;

-- Add remaining rounds
INSERT INTO rounds (name, round_number, stage, transfers_open, is_locked, is_finished) VALUES
('Matchday 1', 1, 'group', true, false, false),
('Matchday 2', 2, 'group', false, false, false),
('Matchday 3', 3, 'group', false, false, false),
('Round of 32', 4, 'round_of_32', false, false, false),
('Round of 16', 5, 'round_of_16', false, false, false),
('Quarter Finals', 6, 'quarter_final', false, false, false),
('Semi Finals', 7, 'semi_final', false, false, false),
('Third Place Match', 8, 'third_place', false, false, false),
('Final', 9, 'final', false, false, false);
