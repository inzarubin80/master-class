export class MasterClass {

    constructor(props = {}) {

        const {
            id = '',
            NameMasterClass = '',
            DescriptionMasterClass = '',
            DateMasterClass = null,
            numberSeats = 0,
            images = [],
            reservation = {}
        } = props;



        this.id = id;
        this.NameMasterClass = NameMasterClass;
        this.DescriptionMasterClass = DescriptionMasterClass;

        if (DateMasterClass) {
            this.DateMasterClass = new Date(DateMasterClass.seconds * 1000);
        }
        else {
            this.DateMasterClass = new Date();
        }

        this.numberSeats = numberSeats;
        this.images = images;

        this.image = images.length ? images[0].src : '';

        this.reservation = reservation;
        this.isRes = (uid) => (uid in reservation);
        this.vacancies = props.numberSeats - Object.keys(reservation).length;



    }
};

export const createMasterClassFromVal = (id, val) => {

    const { reservation = {}, basicData = {} } = val;
    return new MasterClass({ ...basicData, id: id, reservation: reservation });

}

