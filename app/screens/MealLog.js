import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import MealLogMonthlyCalendar from '../components/MealLogMonthlyCalendar';
import MealLogWeeklyCalendar from '../components/MealLogWeeklyCalendar';


export default function MealLog({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const [showWeekly, setShowWeekly] = useState(false);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                {showWeekly ? (
                    <MealLogWeeklyCalendar
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setShowWeekly={setShowWeekly}
                    />
                ) : (
                    <MealLogMonthlyCalendar
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setShowWeekly={setShowWeekly}
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}