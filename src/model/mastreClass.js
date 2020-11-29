export  class  MasterClass
{
    constructor(id = '',NameMasterClass='', DescriptionMasterClass='', DateMasterClass = '', numberSeats = 0, images = [], reservation = {}){
        
        this.id = id;
        this.NameMasterClass = NameMasterClass; 
        this.DescriptionMasterClass = DescriptionMasterClass;
        this.DateMasterClass = DateMasterClass;
        this.numberSeats = numberSeats;
        this.images = images;
        this.reservation = reservation; 
    
        
        this.isRes = (uid) => (uid in reservation);
        this.vacancies = numberSeats  - Object.keys(reservation).length;
  
    }
};

export const createMasterClassFromVal = (id, val) =>{
        
   const  reservation  = val.reservation?val.reservation:{};

    return new MasterClass(id, 
            val.basicData.NameMasterClass, 
            val.basicData.DescriptionMasterClass, 
            val.basicData.DateMasterClass, 
            val.basicData.numberSeats,
            val.basicData.images, 
            reservation);
}

