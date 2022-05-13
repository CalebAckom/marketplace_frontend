import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import '../../assets/css/viewproduct.css';
import { addToRemoteCart } from '../../services/features/slices/CartSlice';
import Recommend from '../../../src/components/Recommend/Recommend';
import RecommendUser from '../../../src/components/Recommend/RecommendUser';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import Previewimages from '../../../src/components/Products/PreviewImages';
import {
  fetchProductRecommended,
  fetchProductSimilar,
  singlePductSelec,
} from '../../services/features/slices/ProductSlice';
import { promptLoginBefore } from '../../../src/components/Products/Product';

const ProductDetail = () => {
  const history = useHistory();
  //redux
  const dispatch = useDispatch();
  const cartKey = useSelector((state) => state.cr.cartKey);
  const cartState = useSelector((state) => state.cr.items);
  const userDoc = useSelector(({ userReducer }) => userReducer.userDoc);
  const similarR = useSelector((state) => state.allP.similar);
  const singleView = useSelector((state) => state.allP.singlePduct);
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  const [itemId, setitemId] = useState();
  const regex = /(<([^>]+)>)/gi;
  const result = singleView.description.replace(regex, '');
  const num_view = singleView.owner.phone_number2.replace(regex, '');
  const owner_view = singleView.owner.title.replace(regex, '');

  var images = [];

  images.push(singleView.image_1);
  images.push(singleView.image_2);
  images.push(singleView.image_3);

  const passPageData = () => {
    history.push(`/business-profile-view/${location.state.params.owner.slug}`, {
      params: location.state.params,
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(
      fetchProductSimilar(
        JSON.stringify({
          uid: location.state.params.owner.id,
          pid: location.state.params.id,
        })
      )
    );

    dispatch(
      fetchProductRecommended(
        JSON.stringify({
          cat: location.state.params.category,
          pid: location.state.params.id,
        })
      )
    );

    dispatch(singlePductSelec(location.state.params));

    setTimeout(() => {
      setIsReady(true);
      console.log('---', similarR);
    }, 1000);
    window.scroll(0, 0);
  }, []);

  function addToCart(data) {
    const pduct = {
      quantity: 1,
      product: data.id,
      shopping_cart: cartKey,
    };

    const findix = cartState.findIndex((item) => item.product === data.id);
    if (findix < 0) {
      dispatch(addToRemoteCart(pduct));
    } else {
      // dispatch(updateRemoteItemQty());
    }
  }

  return (
    <div class='vieWrapper'>
      <div class='container'>
        {!isReady ? (
          <div
            class='d-flex justify-content-center'
            style={{ height: '100vh' }}>
            <span
              className='spinner-border text-secondary'
              style={{
                width: '100px',
                height: '100px',
                marginTop: '100px',
              }}></span>
          </div>
        ) : (
          <div class='row mob-display'>
            <div
              class='p-2'
              style={{ width: '80%', cursor: 'pointer' }}
              onClick={() => {
                window.location = '/';
              }}>
              <img
                src='https://img.icons8.com/color/48/000000/back--v1.png'
                style={{ width: '20px', height: '20px', objectFit: 'cover' }}
              />
            </div>
            <div class='col'>
              <div class='overflow-hidden'>
                <img
                  className='single-img shadow-sm'
                  src={singleView.image_1}
                  alt={singleView.name}
                />
              </div>
              <div className='d-flex flex-row justify-content-center mt-2 mb-2'>
                <img
                  className='img-detail-list'
                  src={singleView.image_1}
                  alt={singleView.owner.id}
                />
                <img
                  className='img-detail-list'
                  src={singleView.image_2}
                  alt={singleView.owner.id}
                />
                <img
                  className='img-detail-list'
                  src={singleView.image_3}
                  alt={singleView.owner.id}
                />
                <Previewimages image={images} />
              </div>
            </div>
            <div class='col'>
              {!userDoc['userType'] && !userDoc['isStaff'] && (
                <button
                  className='addtocartBtn'
                  onClick={() => {
                    if (userDoc['statusLog']) {
                      addToCart(location.state.params);
                    } else {
                      promptLoginBefore();
                    }
                  }}>
                  Add to cart
                </button>
              )}
              <div className='text-left'>
                <div
                  className='fw-bold fs-4 mt-2 mb-2'
                  style={{ fontFamily: 'Roboto,sans-serif' }}>
                  {singleView.name}
                </div>
                <div
                  className='disptabPC fw-bold fs-6  pt-2 pb-2'
                  style={{ fontFamily: 'Roboto,sans-serif' }}>
                  {singleView.discount === 0 ? (
                    <div
                      class='text-dark'
                      style={{ fontFamily: 'Roboto,sans-serif' }}>
                      Gh&#x20B5;{singleView.price}
                    </div>
                  ) : (
                    <>
                      <div
                        class='text-muted'
                        style={{ fontFamily: 'Roboto,sans-serif' }}>
                        <s>Gh&#x20B5;{singleView.price}</s>
                      </div>{' '}
                      &nbsp; Gh&#x20B5;
                      {(
                        singleView.price -
                        singleView.price * (singleView.discount / 100)
                      ).toFixed(2)}
                      <div
                        class='text-white px-1 bg-primary ms-1'
                        style={{
                          fontFamily: 'Roboto,sans-serif',
                          width: '70px',
                        }}>
                        {singleView.discount}% off
                      </div>
                    </>
                  )}
                </div>

                <p
                  className='text-gray-700 text-base'
                  style={{ fontFamily: 'Roboto,sans-serif' }}>
                  <span
                    style={{
                      fontFamily: 'Roboto,sans-serif',
                      color: '#716F81',
                    }}>
                    <ReactReadMoreReadLess
                      charLimit={150}
                      readMoreText={'Read more ▼'}
                      readLessText={'Read less ▲'}
                      readMoreClassName='read-more-less--more'
                      readLessClassName='read-more-less--less'>
                      {result}
                    </ReactReadMoreReadLess>
                  </span>
                </p>
              </div>
              <b>Posted By </b>
              <div
                className='onPCView mt-2 mb-2'
                style={{ fontFamily: 'Roboto,sans-serif' }}>
                <img
                  className='imguser'
                  style={{ fontFamily: 'Roboto,sans-serif', cursor: 'pointer' }}
                  src={
                    singleView.owner.image === null
                      ? '../images/user.png'
                      : singleView.owner.image
                  }
                  alt={singleView.owner.id}
                  onClick={passPageData}
                />
                <p
                  className='ms-1'
                  style={{
                    fontFamily: 'Roboto,sans-serif',
                    color: '#716F81',
                    cursor: 'pointer',
                  }}
                  onClick={passPageData}>
                  {singleView.owner.title}
                </p>
              </div>
              <b>From: </b>
              <span
                style={{ fontFamily: 'Roboto,sans-serif', color: '#716F81' }}>
                {singleView.owner.country}
              </span>
              <br />
              <b>Hotline:</b>{' '}
              <span
                style={{ fontFamily: 'Roboto,sans-serif', color: '#716F81' }}>
                <ReactReadMoreReadLess
                  charLimit={0}
                  readMoreText={'view ▼'}
                  readLessText={'Hide ▲'}
                  readMoreClassName='read-more-less--more'
                  readLessClassName='read-more-less--less'>
                  {num_view}
                </ReactReadMoreReadLess>
              </span>
              <br />
              <b>Location: </b>{' '}
              <span style={{ color: '#716F81' }}>
                {singleView.owner.location}
              </span>{' '}
              <br />
              <b>
                <img
                  src='https://img.icons8.com/fluency/48/000000/link.png'
                  style={{ width: '13px', height: '13px', objectFit: 'cover' }}
                  alt='link'
                />
              </b>{' '}
              <a
                class='text-decoration-none text-lowercase'
                style={{ fontSize: '14px', color: '#1b98e0' }}
                target='_blank'
                rel='noreferrer'
                href={singleView.owner.website}>
                {singleView.owner.website}
              </a>
            </div>
            <div class='col'>
              <div
                class='fs-6 text-center text-uppercase'
                style={{ fontFamily: 'Roboto,sans-serif' }}>
                {' '}
                more from{' '}
                {singleView.owner.title === '' ? (
                  'this business'
                ) : (
                  <ReactReadMoreReadLess
                    charLimit={15}
                    readMoreText={'more'}
                    readLessText={'▲'}
                    readMoreClassName='read-more-less--more'
                    readLessClassName='read-more-less--less'>
                    {owner_view}
                  </ReactReadMoreReadLess>
                )}
                <div className='d-flex flex-row flex-wrap mt-2 mb-2'></div>
              </div>
              <div
                class='d-flex flex-row flex-wrap justify-content-center'
                style={{ fontFamily: 'Roboto,sans-serif' }}>
                <RecommendUser
                  productid={singleView.id}
                  userid={singleView.owner.id}
                />
              </div>
            </div>

            <div class='mb-3 mt-5' style={{ fontFamily: 'Roboto,sans-serif' }}>
              RECOMMENDED FOR YOU
            </div>

            <Recommend
              recommend={singleView.category}
              productid={singleView.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
