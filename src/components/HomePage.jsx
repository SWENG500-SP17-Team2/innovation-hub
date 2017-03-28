import React from 'react';
import { Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card';
import { marginMedium, marginXLarge, textCenter, homepageTitle, homepageBackground, homepageSubtitle} from '../styles';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import ImageGallery from 'react-image-gallery';



class HomePage extends React.Component {

  handleImageLoad(event) {
    console.log('Image loaded ', event.target)
  }

  render() {

    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      },
      {
        original: 'http://cdn1.buuteeq.com/upload/18138/llama-at-the-machu-picchu-unesco-peru-andbeyond.jpg',
        thumbnail: 'http://cdn1.buuteeq.com/upload/18138/llama-at-the-machu-picchu-unesco-peru-andbeyond.jpg'
      }
    ]

    return (
    <div>
      <Card className="container"  style={homepageBackground}>
          <CardTitle title="Innovation Hub" titleStyle={homepageTitle}
                   subtitle="A Place to Share Ideas" subtitleStyle={homepageSubtitle}
                 />
       <CardMedia>
        <ImageGallery
          items={images}
          slideInterval={5000}
          autoPlay={true}
          showPlayButton = {false}
          showFullscreenButton = {false}
          disableArrowKeys = {false}
          showBullets = {true}/>
        </CardMedia>
       </Card>
    </div>
    );
  }

}

// const HomePage = () => (
//   <Card className="container"  style={marginMedium}>
//       <CardTitle title="Innovation Hub"
//                subtitle="A Place to Share Ideas"
//              style={textCenter}/>
//   </Card>
//
// );

export default HomePage;
