import React from 'react'
import './index.css';
import useIntersect from "../ListMasterClasses/useIntersect";
import { useSelector } from 'react-redux'
import { Card} from 'antd';

const ListItemMasterСlass = (props) => {


    const { Meta } = Card;

    const roles = useSelector(state => state.user.userRoles.roles);
    const ref = React.useRef();
    const [isIntersecting] = useIntersect(ref, "10%", true);

    console.log('roles', roles);

    return (
        <div ref={ref} className='MasterClasses'>
            <Card

                hoverable
                // style={}
                cover={<img alt="example" src={isIntersecting?props.image:''} />}
                onClick={props.masterСlassViewing}>
                <Meta title={props.NameMasterClass} description={props.DescriptionMasterClass} />
               

            </Card>
            {(roles.indexOf('admin') !== -1) && <button type="submit" className="btn btn-primary" onClick={props.updateMasterClassClicked}>Изменить</button>}
          
          

        </div>


    );
}

export default ListItemMasterСlass;