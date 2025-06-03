import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {setHistories} from '../../states/history';
import { Alert } from 'react-native';

const useHook = props => {
  const mapRef = useRef(null);
  const [focusMarker, setFocusMarker] = useState();
  const {data: history = {}} = props.history;
  const [byFilter, setByFilter] = useState(history);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [openList, setOpenList] = useState(false);
  const [visible, isVisible] = useState(false);

  const place = [
    {
      name: 'Wangsa Maju, Selangor, Malaysia',
      subName: 'Wangsa Maju',
      latitude: 3.204743,
      longitude: 101.736145,
    },
    {
      name: 'Raub District, Pahang, Malaysia',
      subName: 'Raub District',
      latitude: 3.793532,
      longitude: 101.857468,
    },
    {
      name: 'Bukit Bandaraya, Shah Alam, Selangor, Malaysia',
      subName: 'Bukit Bandaraya',
      latitude: 3.096123,
      longitude: 101.491974,
    },
    {
      name: 'Taman Sri Sinar, Segambut, Kuala Lumpur, Malaysia',
      subName: 'Taman Sri Sinar',
      latitude: 3.186944,
      longitude: 101.650558,
    },
    {
      name: 'Pekan Muar, Muar, Johor, Malaysia',
      subName: '',
      latitude: 2.045994,
      longitude: 102.567879,
    },
    {
      name: 'Pudu, Kuala Lumpur, Malaysia',
      subName: 'Pekan Muar',
      latitude: 3.134467,
      longitude: 101.713196,
    },
    {
      name: 'Jalan Pusara Kuala Berang, Terengganu, Kuala Berang, Malaysia',
      subName: 'Jalan Pusara Kuala Berang',
      latitude: 5.0766,
      longitude: 103.014091,
    },
    {
      name: 'Sentul Selatan, Kuala Lumpur, Kuala Lumpur Province, Malaysia',
      subName: 'Sentul Selatan',
      latitude: 3.179274,
      longitude: 101.693726,
    },
    {
      name: 'Kota Kinabalu, Sabah, Malaysia',
      subName: 'Kota Kinabalu',
      latitude: 5.980408,
      longitude: 116.073456,
    },
    {
      name: 'Pangsun, Hulu Langat, Selangor, Malaysia',
      subName: 'Pangsun',
      latitude: 3.20655,
      longitude: 101.879898,
    },
    {
      name: 'Kota Kemuning, Shah Alam, Selangor, Malaysia',
      subName: 'Kota Kemuning',
      latitude: 3.000984,
      longitude: 101.540794,
    },
    {
      name: 'Taman Tunku Industrial Area, Miri, Sarawak, Malaysia',
      subName: 'Taman Tunku Industrial Area',
      latitude: 4.313247,
      longitude: 113.992035,
    },
    {
      name: 'Jalan Serting Utama 1, Negeri Sembilan, Malaysia',
      subName: 'Jalan Serting Utama 1',
      latitude: 2.894058,
      longitude: 102.408661,
    },
    {
      name: 'Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
      subName: 'Bukit Bintang',
      latitude: 3.146708,
      longitude: 101.711197,
    },
    {
      name: 'Taman Sri Andalas, Klang, Selangor, Malaysia',
      subName: 'Taman Sri Andalas',
      latitude: 3.019777,
      longitude: 101.450493,
    },
    {
      name: 'Taman Sentosa, Johor Bahru, Johor, Malaysia',
      subName: 'Taman Sentosa',
      latitude: 1.492813,
      longitude: 103.766838,
    },
    {
      name: 'Mont Kiara, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
      subName: 'Mont Kiara',
      latitude: 3.169569,
      longitude: 101.652802,
    },
    {
      name: 'Setapak, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
      subName: 'Setapak',
      latitude: 3.187308,
      longitude: 101.703697,
    },
    {
      name: 'Taman Merdeka, Malacca, Malaysia',
      subName: 'Taman Merdeka',
      latitude: 2.266969,
      longitude: 102.246208,
    },
    {
      name: 'Dungun, Terengganu, Malaysia',
      subName: 'Dungun',
      latitude: 4.756459,
      longitude: 103.399681,
    },
    {
      name: 'Pendang, Kedah, Malaysia',
      subName: 'Pendang',
      latitude: 5.98467,
      longitude: 100.45816,
    },
  ];

  useEffect(() => {
    const controller = new AbortController();
    let searchArray = [];
    if (searchKeyword.length) {
      const byName = place
        ? place.filter(i =>
            i.name.toLowerCase().includes(searchKeyword.toLowerCase()),
          )
        : [];
      searchArray.push(...byName);
    }
    setByFilter(searchArray);
    return () => controller.abort();
  }, [searchKeyword]);

  const goTo = item => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(
      {
        latitude: item?.latitude,
        longitude: item?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      3 * 1000,
    );
    setSearchKeyword(item.name);
    setOpenList(false);
    setFocusMarker(item);
    setHistories({data: [...history, item]});
  };

  return {
    mapRef,
    focusMarker,
    setFocusMarker,
    byFilter,
    setByFilter,
    searchKeyword,
    setSearchKeyword,
    openList,
    setOpenList,
    visible,
    isVisible,
    goTo,
    history,
  };
};

export default useHook;