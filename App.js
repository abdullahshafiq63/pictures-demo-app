import React, {Component} from 'react';
import {
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// presentational components
import PicturePreviewCard from './components/PicturePreviewCard';

// app theme
import {colors} from './config/theme';

// axios service
import axiosService from './utils/lib/axiosService';

// screen height and width
const {width, height} = Dimensions.get('window');

export default class AllPicturesScreen extends Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    filtering: false,
    refreshing: false,
    error: null,
  };

  componentDidMount() {
    this._fetchAllPictures();
  }

  _fetchAllPictures = () => {
    const {page} = this.state;
    const URL = `/list?page=${page}&limit=10`;

    axiosService
      .request({
        url: URL,
        method: 'GET',
      })
      .then((response) => {
        this.setState((prevState, nextProps) => ({
          data:
            page === 1
              ? Array.from(response.data)
              : [...this.state.data, ...response.data],
          loading: false,
          loadingMore: false,
          refreshing: false,
        }));
      })
      .catch((error) => {
        this.setState({error, loading: false});
      });
  };

  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this._fetchAllPictures();
      },
    );
  };

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        this._fetchAllPictures();
      },
    );
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: colors.veryLightPink,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return !this.state.loading ? (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        }}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <View
              style={{
                marginTop: 15,
                width: '100%',
              }}>
              <PicturePreviewCard
                author={item.author}
                imageUrl={item.download_url}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={this._renderFooter}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
      </SafeAreaView>
    ) : (
      <View>
        <Text style={{alignSelf: 'center'}}>Loading pictures</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
