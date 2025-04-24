import _ from 'lodash';
/**
 * This function is used to determine which entities need to be created, updated, or deleted.
 * An "entity" is a named object that exists in a course (a tag, a topic, an assessment
 * set, or an assessment module). Entities may be listed explicitly (e.g. in `infoCourse.json`)
 * or implicitly, e.g. by use in questions or assessments.
 *
 * This function takes in a variety of information, including the actual state of the
 * course the current list of entities from the database. In produces arrays of entities to
 * create and update, and entity names to delete.
 */
export function determineOperationsForEntities({ courseEntities, extraEntities, existingEntities, knownNames, makeImplicitEntity, comparisonProperties, isInfoCourseValid, deleteUnused, }) {
    const fullComparisonProperties = ['name', 'number', 'implicit', ...comparisonProperties];
    const existingEntitiesMap = new Map(existingEntities.map((entity) => [entity.name, entity]));
    const desiredEntities = new Map();
    // If `infoCourse.json` is invalid, keep all existing entities in place.
    // Otherwise, sync whatever is in the JSON file.
    if (isInfoCourseValid) {
        for (const entity of courseEntities) {
            desiredEntities.set(entity.name, {
                ...entity,
                implicit: false,
                number: desiredEntities.size + 1,
            });
        }
    }
    else {
        for (const entity of existingEntities) {
            desiredEntities.set(entity.name, {
                ...entity,
                number: desiredEntities.size + 1,
            });
        }
    }
    // Consider each entity name that's actually used. If it doesn't already exist,
    // add an implicit version. Sort for consistent ordering.
    for (const name of Array.from(knownNames).sort()) {
        if (desiredEntities.has(name))
            continue;
        desiredEntities.set(name, {
            ...makeImplicitEntity(name),
            implicit: true,
            number: desiredEntities.size + 1,
        });
    }
    // Add any extra entities at the end.
    if (extraEntities?.length) {
        for (const entity of extraEntities) {
            // Give precedence to user-provided entities if they have the same name.
            if (desiredEntities.has(entity.name))
                continue;
            desiredEntities.set(entity.name, {
                ...entity,
                number: desiredEntities.size + 1,
            });
        }
    }
    // Based on the set of desired entities, determine which ones must be
    // created, updated, or deleted.
    const entitiesToCreate = new Map();
    const entitiesToUpdate = new Map();
    const entitiesToDelete = new Set();
    for (const [name, entity] of desiredEntities) {
        const existingEntity = existingEntitiesMap.get(name);
        if (!existingEntity) {
            entitiesToCreate.set(name, entity);
        }
        else if (!_.isEqual(_.pick(existingEntity, fullComparisonProperties), _.pick(entity, fullComparisonProperties))) {
            // We'll only update the entity if it has changed.
            entitiesToUpdate.set(name, entity);
        }
    }
    if (deleteUnused) {
        for (const name of existingEntitiesMap.keys()) {
            if (!desiredEntities.has(name)) {
                entitiesToDelete.add(name);
            }
        }
    }
    return {
        entitiesToCreate: Array.from(entitiesToCreate.values()),
        entitiesToUpdate: Array.from(entitiesToUpdate.values()),
        entitiesToDelete: Array.from(entitiesToDelete.values()),
    };
}
//# sourceMappingURL=entity-list.js.map