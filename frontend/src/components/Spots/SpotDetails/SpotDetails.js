import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadSpotIdThunk } from '../../../store/spotReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function SpotDetails() {
    const dispatch = useDispatch();
    const params = useParams();
    const spotId = Number(params.spotId);
    const spot = useSelector((state) => state.spot);
    const spotData = spot[spotId];
    const image = spotData?.SpotImages?.[0]?.url;
    const user = spotData?.User
    
    useEffect(() => {
      dispatch(loadSpotIdThunk(spotId));
    }, [dispatch, spotId]);
  
    if (spotId === spotData?.id) {
      return (
        <>
          <div className="spot-information-container">
            {spotData && (
              <>
                <h3>{spotData.name}</h3>
                <h5>{spotData.city}, {spotData.state}, {spotData.country}</h5>
              </>
            )}
          </div>
          <div className="image-container">
            {image && <img src={image} alt="Spot Image" className="spot-image" />}
          </div>
          <div className="name-line">
            Hosted by {user?.firstName} {user?.lastName}
          </div>
          <div className="bottom-row">
            <p>details about the spot</p>
            <div className="reserve-container">
               <div className="reserve-top-line">
                <div className="price">${spotData.price}night</div>
                <div className="review-stuff">star #.# . # reviews</div>
               </div> 
               <div className="reserve-bottom-line">
                <button className="reserve-button" onClick={() => (alert("Feature coming soon..."))}>Reserve</button>
               </div>
            </div>
          </div>         
          <hr></hr>
        </>
      );
    }
  
    return null;
  }