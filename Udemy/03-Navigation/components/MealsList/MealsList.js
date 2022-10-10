import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from './MealItem';

const MealsList = ({ items }) => {
  const renderMealItem = (itemData) => {
    const { id, title, imageUrl, duration, complexity, affordability } =
      itemData.item;
    const mealItemProps = {
      id,
      title,
      imageUrl,
      duration,
      complexity,
      affordability,
    };

    return <MealItem {...mealItemProps} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
