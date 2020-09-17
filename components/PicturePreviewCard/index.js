import React from 'react';
import glamorous from 'glamorous-native';
import {Text} from 'react-native';

// components
import ContainedImage from '../ContainedImage';

const CardContainer = glamorous.view((props, theme) => ({
  height: 250,
  width: '100%',
}));

const CardImageContainer = glamorous.view((props, theme) => ({
  flex: 1,
  alignItems: 'stretch',
}));

const PicturePreviewCard = ({imageUrl, author}) => {
  return (
    <CardContainer>
      <CardImageContainer>
        <ContainedImage source={{uri: imageUrl}} />
        <Text style={{alignSelf: 'center', marginTop: 5}}>{author}</Text>
      </CardImageContainer>
    </CardContainer>
  );
};

export default PicturePreviewCard;
