export class MasterClass {
    
    constructor(props={}) {

        const {
            id='',
            NameMasterClass='',
            DescriptionMasterClass='',
            DateMasterClass='',
            numberSeats=0,
            images=[],
            reservation={}
          } = props;


        this.id = id;
        this.NameMasterClass = NameMasterClass;
        this.DescriptionMasterClass = DescriptionMasterClass;
        this.DateMasterClass = DateMasterClass;
        this.numberSeats = numberSeats;
        this.images = images;
        this.reservation = reservation;
        this.isRes = (uid) => (uid in reservation);
        this.vacancies = props.numberSeats - Object.keys(reservation).length;

    }
};

export const createMasterClassFromVal = (id, val) => {

    const {reservation={}, basicData={}} = val;
    return new MasterClass({...basicData, id:id, reservation:reservation});

}

