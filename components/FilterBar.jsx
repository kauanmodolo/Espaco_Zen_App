// components/FilterBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterBar = ({ selectedCategory, setSelectedCategory, selectedDuration, setSelectedDuration }) => {
  const categories = ['Todas', 'Relaxamento', 'Concentração', 'Energia', 'Respiração', 'Música'];
  const durations = ['Todas', '5-10 min', '10-20 min', '20+ min'];

  return (
    <View style={styles.container}>
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Categoria:</Text>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, selectedCategory === category && styles.selectedButton]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.filterText, selectedCategory === category && styles.selectedText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.label}>Duração:</Text>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[styles.filterButton, selectedDuration === duration && styles.selectedButton]}
            onPress={() => setSelectedDuration(duration)}
          >
            <Text style={[styles.filterText, selectedDuration === duration && styles.selectedText]}>
              {duration}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  label: {
    marginRight: 8,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
  },
  selectedButton: {
    backgroundColor: '#5da0a0',
  },
  filterText: {
    color: '#000',
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
});

export default FilterBar;
