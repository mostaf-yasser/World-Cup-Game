/**
 * World Cup Fantasy - Complete Player Database (Official World Cup 2026)
 * 48 National Teams - 5 players each (240 total players)
 *
 * This data can be imported via Supabase admin panel or SQL insert statements.
 */

export interface SeedPlayer {
  name: string;
  national_team: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  status: 'available' | 'injured' | 'suspended' | 'eliminated';
}

export const seedPlayers: SeedPlayer[] = [
  // === GROUP A ===
  // Mexico
  { name: 'Santiago Gimenez', national_team: 'Mexico', position: 'FWD', status: 'available' },
  { name: 'Hirving Lozano', national_team: 'Mexico', position: 'FWD', status: 'available' },
  { name: 'Edson Alvarez', national_team: 'Mexico', position: 'MID', status: 'available' },
  { name: 'Jorge Sanchez', national_team: 'Mexico', position: 'DEF', status: 'available' },
  { name: 'Guillermo Ochoa', national_team: 'Mexico', position: 'GK', status: 'available' },

  // South Africa
  { name: 'Lyle Foster', national_team: 'South Africa', position: 'FWD', status: 'available' },
  { name: 'Percy Tau', national_team: 'South Africa', position: 'FWD', status: 'available' },
  { name: 'Teboho Mokoena', national_team: 'South Africa', position: 'MID', status: 'available' },
  { name: 'Mothobi Mvala', national_team: 'South Africa', position: 'DEF', status: 'available' },
  { name: 'Ronwen Williams', national_team: 'South Africa', position: 'GK', status: 'available' },

  // South Korea
  { name: 'Son Heung-min', national_team: 'South Korea', position: 'FWD', status: 'available' },
  { name: 'Hwang Hee-chan', national_team: 'South Korea', position: 'FWD', status: 'available' },
  { name: 'Lee Kang-in', national_team: 'South Korea', position: 'MID', status: 'available' },
  { name: 'Kim Min-jae', national_team: 'South Korea', position: 'DEF', status: 'available' },
  { name: 'Jo Hyeon-woo', national_team: 'South Korea', position: 'GK', status: 'available' },

  // Czechia
  { name: 'Patrik Schick', national_team: 'Czechia', position: 'FWD', status: 'available' },
  { name: 'Adam Hlozek', national_team: 'Czechia', position: 'FWD', status: 'available' },
  { name: 'Tomas Soucek', national_team: 'Czechia', position: 'MID', status: 'available' },
  { name: 'Vladimir Coufal', national_team: 'Czechia', position: 'DEF', status: 'available' },
  { name: 'Jindrich Stanek', national_team: 'Czechia', position: 'GK', status: 'available' },

  // === GROUP B ===
  // Canada
  { name: 'Jonathan David', national_team: 'Canada', position: 'FWD', status: 'available' },
  { name: 'Cyle Larin', national_team: 'Canada', position: 'FWD', status: 'available' },
  { name: 'Stephen Eustaquio', national_team: 'Canada', position: 'MID', status: 'available' },
  { name: 'Alphonso Davies', national_team: 'Canada', position: 'DEF', status: 'available' },
  { name: 'Maxime Crepeau', national_team: 'Canada', position: 'GK', status: 'available' },

  // Bosnia and Herzegovina
  { name: 'Edin Dzeko', national_team: 'Bosnia and Herzegovina', position: 'FWD', status: 'available' },
  { name: 'Ermedin Demirovic', national_team: 'Bosnia and Herzegovina', position: 'FWD', status: 'available' },
  { name: 'Miralem Pjanic', national_team: 'Bosnia and Herzegovina', position: 'MID', status: 'available' },
  { name: 'Sead Kolasinac', national_team: 'Bosnia and Herzegovina', position: 'DEF', status: 'available' },
  { name: 'Ibrahim Sehic', national_team: 'Bosnia and Herzegovina', position: 'GK', status: 'available' },

  // Qatar
  { name: 'Almoez Ali', national_team: 'Qatar', position: 'FWD', status: 'available' },
  { name: 'Akram Afif', national_team: 'Qatar', position: 'FWD', status: 'available' },
  { name: 'Hassan Al-Haydos', national_team: 'Qatar', position: 'MID', status: 'available' },
  { name: 'Boualem Khoukhi', national_team: 'Qatar', position: 'DEF', status: 'available' },
  { name: 'Meshaal Barsham', national_team: 'Qatar', position: 'GK', status: 'available' },

  // Switzerland
  { name: 'Breel Embolo', national_team: 'Switzerland', position: 'FWD', status: 'available' },
  { name: 'Zeki Amdouni', national_team: 'Switzerland', position: 'FWD', status: 'available' },
  { name: 'Granit Xhaka', national_team: 'Switzerland', position: 'MID', status: 'available' },
  { name: 'Manuel Akanji', national_team: 'Switzerland', position: 'DEF', status: 'available' },
  { name: 'Yann Sommer', national_team: 'Switzerland', position: 'GK', status: 'available' },

  // === GROUP C ===
  // Brazil
  { name: 'Vinicius Junior', national_team: 'Brazil', position: 'FWD', status: 'available' },
  { name: 'Rodrygo Goes', national_team: 'Brazil', position: 'FWD', status: 'available' },
  { name: 'Lucas Paqueta', national_team: 'Brazil', position: 'MID', status: 'available' },
  { name: 'Marquinhos', national_team: 'Brazil', position: 'DEF', status: 'available' },
  { name: 'Alisson Becker', national_team: 'Brazil', position: 'GK', status: 'available' },

  // Morocco
  { name: 'Youssef En-Nesyri', national_team: 'Morocco', position: 'FWD', status: 'available' },
  { name: 'Hakim Ziyech', national_team: 'Morocco', position: 'MID', status: 'available' },
  { name: 'Sofyan Amrabat', national_team: 'Morocco', position: 'MID', status: 'available' },
  { name: 'Nayef Aguerd', national_team: 'Morocco', position: 'DEF', status: 'available' },
  { name: 'Yassine Bounou', national_team: 'Morocco', position: 'GK', status: 'available' },

  // Haiti
  { name: 'Frantzdy Pierrot', national_team: 'Haiti', position: 'FWD', status: 'available' },
  { name: 'Duckens Nazon', national_team: 'Haiti', position: 'FWD', status: 'available' },
  { name: 'Bryan Alceus', national_team: 'Haiti', position: 'MID', status: 'available' },
  { name: 'Carlens Arcus', national_team: 'Haiti', position: 'DEF', status: 'available' },
  { name: 'Johny Placide', national_team: 'Haiti', position: 'GK', status: 'available' },

  // Scotland
  { name: 'Che Adams', national_team: 'Scotland', position: 'FWD', status: 'available' },
  { name: 'Lawrence Shankland', national_team: 'Scotland', position: 'FWD', status: 'available' },
  { name: 'Scott McTominay', national_team: 'Scotland', position: 'MID', status: 'available' },
  { name: 'Andrew Robertson', national_team: 'Scotland', position: 'DEF', status: 'available' },
  { name: 'Angus Gunn', national_team: 'Scotland', position: 'GK', status: 'available' },

  // === GROUP D ===
  // USA
  { name: 'Christian Pulisic', national_team: 'USA', position: 'FWD', status: 'available' },
  { name: 'Folarin Balogun', national_team: 'USA', position: 'FWD', status: 'available' },
  { name: 'Weston McKennie', national_team: 'USA', position: 'MID', status: 'available' },
  { name: 'Antonee Robinson', national_team: 'USA', position: 'DEF', status: 'available' },
  { name: 'Matt Turner', national_team: 'USA', position: 'GK', status: 'available' },

  // Paraguay
  { name: 'Antonio Sanabria', national_team: 'Paraguay', position: 'FWD', status: 'available' },
  { name: 'Julio Enciso', national_team: 'Paraguay', position: 'FWD', status: 'available' },
  { name: 'Miguel Almiron', national_team: 'Paraguay', position: 'MID', status: 'available' },
  { name: 'Gustavo Gomez', national_team: 'Paraguay', position: 'DEF', status: 'available' },
  { name: 'Carlos Coronel', national_team: 'Paraguay', position: 'GK', status: 'available' },

  // Australia
  { name: 'Mitchell Duke', national_team: 'Australia', position: 'FWD', status: 'available' },
  { name: 'Craig Goodwin', national_team: 'Australia', position: 'FWD', status: 'available' },
  { name: 'Jackson Irvine', national_team: 'Australia', position: 'MID', status: 'available' },
  { name: 'Harry Souttar', national_team: 'Australia', position: 'DEF', status: 'available' },
  { name: 'Mathew Ryan', national_team: 'Australia', position: 'GK', status: 'available' },

  // Turkey
  { name: 'Kenan Yildiz', national_team: 'Turkey', position: 'FWD', status: 'available' },
  { name: 'Baris Alper Yilmaz', national_team: 'Turkey', position: 'FWD', status: 'available' },
  { name: 'Hakan Calhanoglu', national_team: 'Turkey', position: 'MID', status: 'available' },
  { name: 'Merih Demiral', national_team: 'Turkey', position: 'DEF', status: 'available' },
  { name: 'Mert Gunok', national_team: 'Turkey', position: 'GK', status: 'available' },

  // === GROUP E ===
  // Germany
  { name: 'Niclas Fullkrug', national_team: 'Germany', position: 'FWD', status: 'available' },
  { name: 'Kai Havertz', national_team: 'Germany', position: 'FWD', status: 'available' },
  { name: 'Jamal Musiala', national_team: 'Germany', position: 'MID', status: 'available' },
  { name: 'Antonio Rudiger', national_team: 'Germany', position: 'DEF', status: 'available' },
  { name: 'Manuel Neuer', national_team: 'Germany', position: 'GK', status: 'available' },

  // Curaçao
  { name: 'Kenji Gorre', national_team: 'Curaçao', position: 'FWD', status: 'available' },
  { name: 'Rangelo Janga', national_team: 'Curaçao', position: 'FWD', status: 'available' },
  { name: 'Juninho Bacuna', national_team: 'Curaçao', position: 'MID', status: 'available' },
  { name: 'Cuco Martina', national_team: 'Curaçao', position: 'DEF', status: 'available' },
  { name: 'Eloy Room', national_team: 'Curaçao', position: 'GK', status: 'available' },

  // Ivory Coast
  { name: 'Sebastien Haller', national_team: 'Ivory Coast', position: 'FWD', status: 'available' },
  { name: 'Simon Adingra', national_team: 'Ivory Coast', position: 'FWD', status: 'available' },
  { name: 'Franck Kessie', national_team: 'Ivory Coast', position: 'MID', status: 'available' },
  { name: 'Evan Ndicka', national_team: 'Ivory Coast', position: 'DEF', status: 'available' },
  { name: 'Yahia Fofana', national_team: 'Ivory Coast', position: 'GK', status: 'available' },

  // Ecuador
  { name: 'Enner Valencia', national_team: 'Ecuador', position: 'FWD', status: 'available' },
  { name: 'Jordy Caicedo', national_team: 'Ecuador', position: 'FWD', status: 'available' },
  { name: 'Moises Caicedo', national_team: 'Ecuador', position: 'MID', status: 'available' },
  { name: 'Pervis Estupinan', national_team: 'Ecuador', position: 'DEF', status: 'available' },
  { name: 'Alexander Dominguez', national_team: 'Ecuador', position: 'GK', status: 'available' },

  // === GROUP F ===
  // Netherlands
  { name: 'Cody Gakpo', national_team: 'Netherlands', position: 'FWD', status: 'available' },
  { name: 'Memphis Depay', national_team: 'Netherlands', position: 'FWD', status: 'available' },
  { name: 'Frenkie De Jong', national_team: 'Netherlands', position: 'MID', status: 'available' },
  { name: 'Virgil Van Dijk', national_team: 'Netherlands', position: 'DEF', status: 'available' },
  { name: 'Bart Verbruggen', national_team: 'Netherlands', position: 'GK', status: 'available' },

  // Japan
  { name: 'Kyogo Furuhashi', national_team: 'Japan', position: 'FWD', status: 'available' },
  { name: 'Kaoru Mitoma', national_team: 'Japan', position: 'FWD', status: 'available' },
  { name: 'Takefusa Kubo', national_team: 'Japan', position: 'MID', status: 'available' },
  { name: 'Maya Yoshida', national_team: 'Japan', position: 'DEF', status: 'available' },
  { name: 'Zion Suzuki', national_team: 'Japan', position: 'GK', status: 'available' },

  // Sweden
  { name: 'Viktor Gyokeres', national_team: 'Sweden', position: 'FWD', status: 'available' },
  { name: 'Alexander Isak', national_team: 'Sweden', position: 'FWD', status: 'available' },
  { name: 'Dejan Kulusevski', national_team: 'Sweden', position: 'MID', status: 'available' },
  { name: 'Victor Lindelof', national_team: 'Sweden', position: 'DEF', status: 'available' },
  { name: 'Robin Olsen', national_team: 'Sweden', position: 'GK', status: 'available' },

  // Tunisia
  { name: 'Youssef Msakni', national_team: 'Tunisia', position: 'FWD', status: 'available' },
  { name: 'Elias Achouri', national_team: 'Tunisia', position: 'FWD', status: 'available' },
  { name: 'Ellyes Skhiri', national_team: 'Tunisia', position: 'MID', status: 'available' },
  { name: 'Montassar Talbi', national_team: 'Tunisia', position: 'DEF', status: 'available' },
  { name: 'Aymen Dahmen', national_team: 'Tunisia', position: 'GK', status: 'available' },

  // === GROUP G ===
  // Belgium
  { name: 'Romelu Lukaku', national_team: 'Belgium', position: 'FWD', status: 'available' },
  { name: 'Jeremy Doku', national_team: 'Belgium', position: 'FWD', status: 'available' },
  { name: 'Kevin De Bruyne', national_team: 'Belgium', position: 'MID', status: 'available' },
  { name: 'Jan Vertonghen', national_team: 'Belgium', position: 'DEF', status: 'available' },
  { name: 'Thibaut Courtois', national_team: 'Belgium', position: 'GK', status: 'available' },

  // Egypt
  { name: 'Mohamed Salah', national_team: 'Egypt', position: 'FWD', status: 'available' },
  { name: 'Mostafa Mohamed', national_team: 'Egypt', position: 'FWD', status: 'available' },
  { name: 'Trezeguet', national_team: 'Egypt', position: 'MID', status: 'available' },
  { name: 'Mohamed Abdelmonem', national_team: 'Egypt', position: 'DEF', status: 'available' },
  { name: 'Mohamed El Shenawy', national_team: 'Egypt', position: 'GK', status: 'available' },

  // Iran
  { name: 'Mehdi Taremi', national_team: 'Iran', position: 'FWD', status: 'available' },
  { name: 'Sardar Azmoun', national_team: 'Iran', position: 'FWD', status: 'available' },
  { name: 'Alireza Jahanbakhsh', national_team: 'Iran', position: 'MID', status: 'available' },
  { name: 'Morteza Pouraliganji', national_team: 'Iran', position: 'DEF', status: 'available' },
  { name: 'Alireza Beiranvand', national_team: 'Iran', position: 'GK', status: 'available' },

  // New Zealand
  { name: 'Chris Wood', national_team: 'New Zealand', position: 'FWD', status: 'available' },
  { name: 'Ben Waine', national_team: 'New Zealand', position: 'FWD', status: 'available' },
  { name: 'Sarpreet Singh', national_team: 'New Zealand', position: 'MID', status: 'available' },
  { name: 'Liberato Cacace', national_team: 'New Zealand', position: 'DEF', status: 'available' },
  { name: 'Oliver Sail', national_team: 'New Zealand', position: 'GK', status: 'available' },

  // === GROUP H ===
  // Spain
  { name: 'Alvaro Morata', national_team: 'Spain', position: 'FWD', status: 'available' },
  { name: 'Nico Williams', national_team: 'Spain', position: 'FWD', status: 'available' },
  { name: 'Lamine Yamal', national_team: 'Spain', position: 'FWD', status: 'available' },
  { name: 'Aymeric Laporte', national_team: 'Spain', position: 'DEF', status: 'available' },
  { name: 'Unai Simon', national_team: 'Spain', position: 'GK', status: 'available' },

  // Cape Verde
  { name: 'Ryan Mendes', national_team: 'Cape Verde', position: 'FWD', status: 'available' },
  { name: 'Garry Rodrigues', national_team: 'Cape Verde', position: 'FWD', status: 'available' },
  { name: 'Jamiro Monteiro', national_team: 'Cape Verde', position: 'MID', status: 'available' },
  { name: 'Logan Costa', national_team: 'Cape Verde', position: 'DEF', status: 'available' },
  { name: 'Vozinha', national_team: 'Cape Verde', position: 'GK', status: 'available' },

  // Saudi Arabia
  { name: 'Salem Al-Dawsari', national_team: 'Saudi Arabia', position: 'FWD', status: 'available' },
  { name: 'Saleh Al-Shehri', national_team: 'Saudi Arabia', position: 'FWD', status: 'available' },
  { name: 'Saud Abdulhamid', national_team: 'Saudi Arabia', position: 'MID', status: 'available' },
  { name: 'Ali Al-Bulaihi', national_team: 'Saudi Arabia', position: 'DEF', status: 'available' },
  { name: 'Mohammed Al-Owais', national_team: 'Saudi Arabia', position: 'GK', status: 'available' },

  // Uruguay
  { name: 'Darwin Nunez', national_team: 'Uruguay', position: 'FWD', status: 'available' },
  { name: 'Luis Suarez', national_team: 'Uruguay', position: 'FWD', status: 'available' },
  { name: 'Federico Valverde', national_team: 'Uruguay', position: 'MID', status: 'available' },
  { name: 'Ronald Araujo', national_team: 'Uruguay', position: 'DEF', status: 'available' },
  { name: 'Sergio Rochet', national_team: 'Uruguay', position: 'GK', status: 'available' },

  // === GROUP I ===
  // France
  { name: 'Kylian Mbappe', national_team: 'France', position: 'FWD', status: 'available' },
  { name: 'Ousmane Dembele', national_team: 'France', position: 'FWD', status: 'available' },
  { name: 'Antoine Griezmann', national_team: 'France', position: 'MID', status: 'available' },
  { name: 'William Saliba', national_team: 'France', position: 'DEF', status: 'available' },
  { name: 'Mike Maignan', national_team: 'France', position: 'GK', status: 'available' },

  // Senegal
  { name: 'Sadio Mane', national_team: 'Senegal', position: 'FWD', status: 'available' },
  { name: 'Nicolas Jackson', national_team: 'Senegal', position: 'FWD', status: 'available' },
  { name: 'Idrissa Gueye', national_team: 'Senegal', position: 'MID', status: 'available' },
  { name: 'Kalidou Koulibaly', national_team: 'Senegal', position: 'DEF', status: 'available' },
  { name: 'Edouard Mendy', national_team: 'Senegal', position: 'GK', status: 'available' },

  // Iraq
  { name: 'Aymen Hussein', national_team: 'Iraq', position: 'FWD', status: 'available' },
  { name: 'Mohanad Ali', national_team: 'Iraq', position: 'FWD', status: 'available' },
  { name: 'Ibrahim Bayesh', national_team: 'Iraq', position: 'MID', status: 'available' },
  { name: 'Rebin Sulaka', national_team: 'Iraq', position: 'DEF', status: 'available' },
  { name: 'Jalal Hassan', national_team: 'Iraq', position: 'GK', status: 'available' },

  // Norway
  { name: 'Erling Haaland', national_team: 'Norway', position: 'FWD', status: 'available' },
  { name: 'Alexander Sorloth', national_team: 'Norway', position: 'FWD', status: 'available' },
  { name: 'Martin Odegaard', national_team: 'Norway', position: 'MID', status: 'available' },
  { name: 'Leo Ostigard', national_team: 'Norway', position: 'DEF', status: 'available' },
  { name: 'Orjan Nyland', national_team: 'Norway', position: 'GK', status: 'available' },

  // === GROUP J ===
  // Argentina
  { name: 'Lionel Messi', national_team: 'Argentina', position: 'FWD', status: 'available' },
  { name: 'Julian Alvarez', national_team: 'Argentina', position: 'FWD', status: 'available' },
  { name: 'Rodrigo De Paul', national_team: 'Argentina', position: 'MID', status: 'available' },
  { name: 'Cristian Romero', national_team: 'Argentina', position: 'DEF', status: 'available' },
  { name: 'Emiliano Martinez', national_team: 'Argentina', position: 'GK', status: 'available' },

  // Algeria
  { name: 'Riyad Mahrez', national_team: 'Algeria', position: 'FWD', status: 'available' },
  { name: 'Islam Slimani', national_team: 'Algeria', position: 'FWD', status: 'available' },
  { name: 'Ismael Bennacer', national_team: 'Algeria', position: 'MID', status: 'available' },
  { name: 'Ramy Bensebaini', national_team: 'Algeria', position: 'DEF', status: 'available' },
  { name: 'Anthony Mandrea', national_team: 'Algeria', position: 'GK', status: 'available' },

  // Austria
  { name: 'Marko Arnautovic', national_team: 'Austria', position: 'FWD', status: 'available' },
  { name: 'Michael Gregoritsch', national_team: 'Austria', position: 'FWD', status: 'available' },
  { name: 'Marcel Sabitzer', national_team: 'Austria', position: 'MID', status: 'available' },
  { name: 'David Alaba', national_team: 'Austria', position: 'DEF', status: 'available' },
  { name: 'Alexander Schlager', national_team: 'Austria', position: 'GK', status: 'available' },

  // Jordan
  { name: 'Mousa Al-Tamari', national_team: 'Jordan', position: 'FWD', status: 'available' },
  { name: 'Yazan Al-Naimat', national_team: 'Jordan', position: 'FWD', status: 'available' },
  { name: 'Nizar Al-Rashdan', national_team: 'Jordan', position: 'MID', status: 'available' },
  { name: 'Yazan Al-Arab', national_team: 'Jordan', position: 'DEF', status: 'available' },
  { name: 'Yazid Abu Layla', national_team: 'Jordan', position: 'GK', status: 'available' },

  // === GROUP K ===
  // Portugal
  { name: 'Cristiano Ronaldo', national_team: 'Portugal', position: 'FWD', status: 'available' },
  { name: 'Rafael Leao', national_team: 'Portugal', position: 'FWD', status: 'available' },
  { name: 'Bruno Fernandes', national_team: 'Portugal', position: 'MID', status: 'available' },
  { name: 'Ruben Dias', national_team: 'Portugal', position: 'DEF', status: 'available' },
  { name: 'Diogo Costa', national_team: 'Portugal', position: 'GK', status: 'available' },

  // Congo DR
  { name: 'Yoane Wissa', national_team: 'Congo DR', position: 'FWD', status: 'available' },
  { name: 'Cedric Bakambu', national_team: 'Congo DR', position: 'FWD', status: 'available' },
  { name: 'Samuel Moutoussamy', national_team: 'Congo DR', position: 'MID', status: 'available' },
  { name: 'Chancel Mbemba', national_team: 'Congo DR', position: 'DEF', status: 'available' },
  { name: 'Lionel Mpasi', national_team: 'Congo DR', position: 'GK', status: 'available' },

  // Uzbekistan
  { name: 'Eldor Shomurodov', national_team: 'Uzbekistan', position: 'FWD', status: 'available' },
  { name: 'Igor Sergeev', national_team: 'Uzbekistan', position: 'FWD', status: 'available' },
  { name: 'Otabek Shukurov', national_team: 'Uzbekistan', position: 'MID', status: 'available' },
  { name: 'Abdukodir Khusanov', national_team: 'Uzbekistan', position: 'DEF', status: 'available' },
  { name: 'Utkir Yusupov', national_team: 'Uzbekistan', position: 'GK', status: 'available' },

  // Colombia
  { name: 'Luis Diaz', national_team: 'Colombia', position: 'FWD', status: 'available' },
  { name: 'Rafael Santos Borre', national_team: 'Colombia', position: 'FWD', status: 'available' },
  { name: 'James Rodriguez', national_team: 'Colombia', position: 'MID', status: 'available' },
  { name: 'Davinson Sanchez', national_team: 'Colombia', position: 'DEF', status: 'available' },
  { name: 'Camilo Vargas', national_team: 'Colombia', position: 'GK', status: 'available' },

  // === GROUP L ===
  // England
  { name: 'Harry Kane', national_team: 'England', position: 'FWD', status: 'available' },
  { name: 'Bukayo Saka', national_team: 'England', position: 'FWD', status: 'available' },
  { name: 'Jude Bellingham', national_team: 'England', position: 'MID', status: 'available' },
  { name: 'John Stones', national_team: 'England', position: 'DEF', status: 'available' },
  { name: 'Jordan Pickford', national_team: 'England', position: 'GK', status: 'available' },

  // Croatia
  { name: 'Andrej Kramaric', national_team: 'Croatia', position: 'FWD', status: 'available' },
  { name: 'Ivan Perisic', national_team: 'Croatia', position: 'MID', status: 'available' },
  { name: 'Luka Modric', national_team: 'Croatia', position: 'MID', status: 'available' },
  { name: 'Josko Gvardiol', national_team: 'Croatia', position: 'DEF', status: 'available' },
  { name: 'Dominik Livakovic', national_team: 'Croatia', position: 'GK', status: 'available' },

  // Ghana
  { name: 'Inaki Williams', national_team: 'Ghana', position: 'FWD', status: 'available' },
  { name: 'Mohammed Kudus', national_team: 'Ghana', position: 'MID', status: 'available' },
  { name: 'Thomas Partey', national_team: 'Ghana', position: 'MID', status: 'available' },
  { name: 'Alexander Djiku', national_team: 'Ghana', position: 'DEF', status: 'available' },
  { name: 'Lawrence Ati-Zigi', national_team: 'Ghana', position: 'GK', status: 'available' },

  // Panama
  { name: 'Cecilio Waterman', national_team: 'Panama', position: 'FWD', status: 'available' },
  { name: 'Jose Fajardo', national_team: 'Panama', position: 'FWD', status: 'available' },
  { name: 'Adalberto Carrasquilla', national_team: 'Panama', position: 'MID', status: 'available' },
  { name: 'Fidel Escobar', national_team: 'Panama', position: 'DEF', status: 'available' },
  { name: 'Orlando Mosquera', national_team: 'Panama', position: 'GK', status: 'available' },
];

// National teams list
export const nationalTeams = [
  'Mexico', 'South Africa', 'South Korea', 'Czechia',
  'Canada', 'Bosnia and Herzegovina', 'Qatar', 'Switzerland',
  'Brazil', 'Morocco', 'Haiti', 'Scotland',
  'USA', 'Paraguay', 'Australia', 'Turkey',
  'Germany', 'Curaçao', 'Ivory Coast', 'Ecuador',
  'Netherlands', 'Japan', 'Sweden', 'Tunisia',
  'Belgium', 'Egypt', 'Iran', 'New Zealand',
  'Spain', 'Cape Verde', 'Saudi Arabia', 'Uruguay',
  'France', 'Senegal', 'Iraq', 'Norway',
  'Argentina', 'Algeria', 'Austria', 'Jordan',
  'Portugal', 'Congo DR', 'Uzbekistan', 'Colombia',
  'England', 'Croatia', 'Ghana', 'Panama',
];

// Tournament rounds
export const seedRounds = [
  { name: 'Matchday 1', round_number: 1, stage: 'group', transfers_open: true, is_locked: false, is_finished: false },
  { name: 'Matchday 2', round_number: 2, stage: 'group', transfers_open: false, is_locked: false, is_finished: false },
  { name: 'Matchday 3', round_number: 3, stage: 'group', transfers_open: false, is_locked: false, is_finished: false },
  { name: 'Round of 32', round_number: 4, stage: 'round_of_32', transfers_open: false, is_locked: false, is_finished: false },
  { name: 'Round of 16', round_number: 5, stage: 'round_of_16', transfers_open: false, is_locked: false, is_finished: false },
  { name: 'Quarter Finals', round_number: 6, stage: 'quarter_final', transfers_open: false, is_locked: false, is_finished: false },
  { name: 'Semi Finals', round_number: 7, stage: 'semi_final', transfers_open: false, is_locked: false, is_finished: false },
  { name: 'Third Place Match', round_number: 8, stage: 'third_place', transfers_open: false, is_locked: false, is_finished: false },
  { name: 'Final', round_number: 9, stage: 'final', transfers_open: false, is_locked: false, is_finished: false },
];

// SQL generation helper
export function generateInsertSQL(): string {
  const sql: string[] = [];

  sql.push('-- World Cup Fantasy Seed Data');
  sql.push('-- 48 National Teams with 5 players each\n');

  sql.push('-- Players');
  seedPlayers.forEach(p => {
    sql.push(`INSERT INTO players (name, national_team, position, photo_url, status) VALUES ('${p.name}', '${p.national_team}', '${p.position}', NULL, '${p.status}');`);
  });

  sql.push('\n-- Rounds');
  seedRounds.forEach(r => {
    sql.push(`INSERT INTO rounds (name, round_number, stage, transfers_open, is_locked, is_finished) VALUES ('${r.name}', ${r.round_number}, '${r.stage}', ${r.transfers_open}, ${r.is_locked}, ${r.is_finished});`);
  });

  return sql.join('\n');
}

export default seedPlayers;
