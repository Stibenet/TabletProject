package com.malkollm.tabletproject.repository;

import com.malkollm.tabletproject.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
} 