import {
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import {
    ACCENT_COLOUR,
    PRIMARY_COLOUR,
    SECONDARY_COLOUR,
  } from "../../../constants/basic";
  import { StackScreenProps } from "@react-navigation/stack";
  import { MainStackParams } from "../../Navigators/MainNavigator";
  import Header from "../../Header/Header";
  import { FlatList } from "react-native-gesture-handler";
  import SemesterCard from "../../Cards/SemesterCard";
  import CreateSemesterModal from "../../Modals/CreateSemesterModal";
  import { useDataContext } from "../../../contexts/Data";
  import Background from "../../Background/Background";
  import { LineChart } from "react-native-chart-kit";
  import Icon from "react-native-vector-icons/Feather";
  import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
  import BannerAd from "../../Ads/BannerAd";
  
  type InstitutionProps = StackScreenProps<MainStackParams, "Home">;
  
  const Institution: React.FC<InstitutionProps> = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const dataCtx = useDataContext();
    const chartContainerHeight = useSharedValue(0);
    const chartContainerStyle = useAnimatedStyle(() => {
      return {
        height: chartContainerHeight.value
      }
    }, [])
    const [triggerChart, setTriggerChart] = useState(false);
    const [triggerSelect, setTriggerSelect] = useState(false);
    const [triggerCreate, setTriggerCreate] = useState(false);
   
    const handleChartToggle = () => {
       if (triggerChart) {
        chartContainerHeight.value = withSpring(height * 0.225)
       } else {
        chartContainerHeight.value = withTiming(0)
       }
    }
  
    useEffect(() => {
      handleChartToggle();
    }, [triggerChart])
    
    return (
      <View style={styles.root}>
        <Background />
        <CreateSemesterModal
          trigger={triggerCreate}
          setTrigger={setTriggerCreate}
        />
        <View style={[styles.container, {width: width * 0.9}]}>
          <Header />
          <Text style={styles.name}>Fall</Text>
          <Text style={styles.gpaHeader}>Overall GPA</Text>
          <Text style={styles.gpa}>3.75</Text>
          <View style={[styles.rowContainer]}>
            <Text style={styles.smallText}>Scale of 4</Text>
            <Pressable style={{flexDirection: 'row'}} onPress={() => setTriggerChart(!triggerChart)}>
              <Text style={styles.smallText}>{triggerChart ? 'Hide' : 'Show'} Chart</Text>
              <Icon name={triggerChart ? "chevron-up" : "chevron-down"} size={20} color={ACCENT_COLOUR} /> 
            </Pressable>
          </View>
          <Animated.View style={[styles.chartContainer, {marginBottom: triggerChart ? 20 : 0}, chartContainerStyle]}>
            <LineChart
              data={{
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", '20'],
                datasets: [
                  {
                    data: [2.21, 2.67, 3.75, 2.21, 2.67, 3.75, 2.21, 2.67, 3.75, 2.21, 2.67, 3.75, 2.21, 2.67, 3.75, 2.21, 2.67, 3.75, 2.3, 4 ],
                  },
                ],
              }}
              fromZero={true}
              width={width * 0.9} // from react-native
              height={height * 0.2}
              transparent={true}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              
            />
          </Animated.View>
          {/* <BannerAd/> */}
          <View style={styles.flatlistActionsContainer}>
              <Text style={styles.flatlistHeader}>Sessions</Text>
              <View style={{flexDirection: 'row'}}>
                <Pressable onPress={() => {setTriggerSelect(!triggerSelect), navigation.push('ProfileSetup')}}><Text style={[styles.flatlistAction, triggerSelect ? styles.actionHighlight : styles.actionDefault]}>Select</Text></Pressable>
                <Pressable onPress={() => setTriggerCreate(true)}><Text style={[styles.flatlistAction, styles.actionDefault]}>Create</Text></Pressable>
              </View>
          </View>
          <FlatList
            style={{width}}
            data={dataCtx?.semesters}
            renderItem={({ item }) => <SemesterCard semester={item} />}
            contentContainerStyle={{ alignItems: "center", paddingTop: 15}}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };
  
  export default Institution;
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center'
    },
    container: {
      flex: 1,
      alignItems: "center",
    },
    name: {
      fontSize: 25,
      fontFamily: "InterBold",
      marginBottom: 20
    },
    gpaHeader: {
      fontSize: 20,
      fontFamily: "Inter",
      color: ACCENT_COLOUR,
    },
    gpa: {
      fontSize: 100,
      fontFamily: "InterBlack",
      marginBottom: 10
    },
    rowContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    smallText: {
      fontSize: 15,
      fontFamily: "Inter",
      color: ACCENT_COLOUR,
    },
    chartContainer: {
      borderRadius: 20,
      backgroundColor: SECONDARY_COLOUR,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: SECONDARY_COLOUR,
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 7,
    },
    flatlistActionsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: ACCENT_COLOUR,
    },
    flatlistHeader: {
      fontSize: 25,
      fontFamily: "Inter",
      color: ACCENT_COLOUR,
    },
    flatlistAction: {
      marginLeft: 5,
      fontSize: 15,
      fontFamily: "Inter",
      paddingVertical: 2.5,
      paddingHorizontal: 15,
      borderRadius: 15
    },
    actionDefault: {
      color: PRIMARY_COLOUR,
      backgroundColor: ACCENT_COLOUR,
    },
    actionHighlight: {
      color: PRIMARY_COLOUR,
      backgroundColor: SECONDARY_COLOUR,
    },
  });
  