import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SatelliteInfoCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>AmbaSat-1 Space Satellite</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Type: CubeSat</p>
            <p>Mission: Earth Observation</p>
            <p>Operator: AmbaSat</p>
        </CardContent>
    </Card>
);

export default SatelliteInfoCard;
