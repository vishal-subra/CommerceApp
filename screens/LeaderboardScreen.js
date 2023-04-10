import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Leaderboard from 'react-native-leaderboard';
import { getLeaderboard } from '../actions/leaderboardActions';
import RenderHeader from '../component/Header';

const LeaderboardScreen = () => {

  const leaderboard = useSelector(state => state.leaderboard);
  const { loading, data, error, login } = leaderboard;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const [profile, setProfile] = useState(userInfo)
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getLeaderboard())
    }
    return () => mounted = false;

  }, []);


  return (
    <View style={styles.header}>
      {/* <RenderHeader props={profile} /> */}
      <Leaderboard
        data={data.data}
        sortBy='point'
        icon="image"
        onRowPress={(item) => setProfile(item)}
        labelBy='fullName' />
    </View>
  )
}

export default LeaderboardScreen

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white',

  },
});