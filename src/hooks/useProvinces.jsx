

const useProvinces = () => {
  const provinces = [
    "1-Koshi Province",
    "2-Madhesh Province",
    "3-Bagmati Province",
    "4-Gandaki Province",
    "5-Lumbini Province",
    "6-Karnali Province",
    "7-Sudurpashchim Province",
  ];
  const districts = {
    "1-Koshi Province": [
      "Bhojpur District",
      "Dhankuta District",
      "Ilam District",
      "Jhapa District",
      "Khotang District",
      "Morang District",
      "Okhaldhunga District",
      "Panchthar District",
      "Sankhuwasabha District",
      "Solukhumbu District",
      "Sunsari District",
      "Taplejung District",
      "Tehrathum District",
      "Udayapur District",
    ],

    "2-Madhesh Province": [
      "Parsa District",
      "Bara District",
      "Rautahat District",
      "Sarlahi District",
      "Dhanusha District",
      "Siraha District",
      "Mahottari District",
      "Saptari District",
    ],

    "3-Bagmati Province": [
      "Sindhuli District",
      "Ramechhap District",
      "Dolakha District",
      "Bhaktapur District",
      "Dhading District",
      "Kathmandu District",
      "Kavrepalanchok District",
      "Lalitpur District",
      "Nuwakot District",
      "Rasuwa District",
      "Sindhupalchok District",
      "Chitwan District",
      "Makwanpur District",
    ],

    "4-Gandaki Province": [
      "Baglung District",
      "Gorkha District",
      "Kaski District",
      "Lamjung District",
      "Manang District",
      "Mustang District",
      "Myagdi District",
      "Nawalparasi (East of Bardaghat Susta) District",
      "Parbat District",
      "Syangja District",
      "Tanahun District",
    ],

    "5-Lumbini Province": [
      "Kapilvastu District",
      "Nawalparasi (West of Bardaghat Susta) District",
      "Rupandehi District",
      "Arghakhanchi District",
      "Gulmi District",
      "Palpa District",
      "Dang District",
      "Pyuthan District",
      "Rolpa District",
      "Eastern Rukum",
      "Banke District",
      "Bardiya District",
    ],

    "6-Karnali Province": [
      "Western Rukum District",
      "Salyan District",
      "Dolpa District",
      "Humla District",
      "Jumla District",
      "Kalikot District",
      "Mugu District",
      "Surkhet District",
      "Dailekh District",
      "Jajarkot District",
    ],

    "7-Sudurpashchim Province": [
      "Kailali District",
      "Achham District",
      "Doti District",
      "Bajhang District",
      "Bajura District",
      "Kanchanpur District",
      "Dadeldhura District",
      "Baitadi District",
      "Darchula District",
    ],
  };

  

  return { provinces, districts };
};

export default useProvinces;
