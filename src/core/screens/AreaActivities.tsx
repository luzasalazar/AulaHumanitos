import { useParams, Navigate } from 'react-router-dom';
import Layout from '../ui/Layout';
import ActivityCard from '../ui/ActivityCard';
import EmptyState from '../ui/EmptyState';
import { areaRegistry } from '../registry/areaRegistry';
import { activitiesByArea } from '../registry/activitiesRegistry';
import { AREA_VISUALS, DEFAULT_AREA_VISUAL } from '../ui/areaVisuals';

export default function AreaActivities() {
  const { areaId } = useParams<{ areaId: string }>();
  const area = areaRegistry.find((a) => a.id === areaId);

  // Si alguien escribe una ruta que no corresponde a ningún área, vuelve al inicio.
  if (!area) {
    return <Navigate to="/" replace />;
  }

  const activities = activitiesByArea[area.id] ?? [];
  const visual = AREA_VISUALS[area.id] ?? DEFAULT_AREA_VISUAL;

  return (
    <Layout eyebrow={area.name} eyebrowColor={visual.color}>
      <h1 className="font-poppins font-bold text-3xl md:text-4xl text-negro-suave mb-3">
        {area.name}
      </h1>
      <p className="font-montserrat text-base text-negro-suave/70 max-w-2xl mb-8 leading-relaxed">
        {area.description}
      </p>

      {activities.length === 0 ? (
        <EmptyState
          message="Muy pronto habrá actividades disponibles en esta área."
          color={visual.color}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              icon={visual.icon}
              color={visual.color}
              tint={visual.tint}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
